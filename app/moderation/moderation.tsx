import React, { useEffect, useState, FormEvent, SyntheticEvent } from 'react';

const API_BASE = "https://nsfwplaza.jajca.site/api";

interface ModerationItem {
  _id: string;
  name: string;
  collection: 'themes' | 'splashes' | 'badges';
  previewUrl: string;
  tags: string[];
  date?: string;
}

export default function ModerationPage(){
  const [pendingItems, setPendingItems] = useState<ModerationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>(() => sessionStorage.getItem('mod_password') || '');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const fetchQueue = async (authPass: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/moderate/all`, {
        headers: { 'x-moderation-password': authPass }
      });

      if (res.status === 401) {
        throw new Error("Invalid moderation password.");
      }
      if (!res.ok) throw new Error("Failed to fetch queue.");

      const data: ModerationItem[] = await res.json();
      setPendingItems(data);
      setIsAuthenticated(true);
      sessionStorage.setItem('mod_password', authPass);
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unknown error occurred";
      setError(message);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) {
      fetchQueue(password);
    }
  }, []);

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (password) fetchQueue(password);
  };

  const handleAccept = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/moderate/accept/${id}`, {
        method: 'POST',
        headers: { 'x-moderation-password': password }
      });

      if (res.ok) {
        setPendingItems(prev => prev.filter(item => item._id !== id));
      } else {
        alert("Failed to accept item.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: string): Promise<void> => {
    if (!window.confirm("Are you sure you want to reject and permanently delete this item?")) return;

    try {
      const res = await fetch(`${API_BASE}/moderate/reject/${id}`, {
        method: 'POST',
        headers: { 'x-moderation-password': password }
      });

      if (res.ok) {
        setPendingItems(prev => prev.filter(item => item._id !== id));
      } else {
        alert("Failed to reject item.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
    e.currentTarget.src = 'https://via.placeholder.com/300x200?text=No+Preview';
  };

  // Render Password Modal if not authenticated
  if (!isAuthenticated) {
    return (
      <div style={{ padding: '40px', maxWidth: '400px', margin: '100px auto', backgroundColor: '#1a1a1a', borderRadius: '8px', color: '#fff' }}>
        <h2>Moderation Access</h2>
        {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            type="password"
            placeholder="Enter Moderation Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Moderation Queue ({pendingItems.length})</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem('mod_password');
            setIsAuthenticated(false);
            setPassword('');
          }}
          style={{ padding: '6px 12px', background: '#444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {pendingItems.length === 0 ? (
        <p>No items pending moderation!</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {pendingItems.map((item) => (
            <div key={item._id} style={{ border: '1px solid #333', borderRadius: '8px', padding: '16px', backgroundColor: '#1a1a1a', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img
                  src={`${API_BASE}${item.previewUrl}`}
                  alt={item.name}
                  onError={handleImageError}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                />
                <h3 style={{ fontSize: '1.1rem', margin: '12px 0 6px 0', wordBreak: 'break-all' }}>{item.name}</h3>
                <p style={{ color: '#aaa', fontSize: '0.9rem', margin: '4px 0' }}>Collection: <strong>{item.collection}</strong></p>
                
                {item.tags && item.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', margin: '8px 0' }}>
                    {item.tags.map((tag, idx) => (
                      <span key={idx} style={{ background: '#333', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <button
                  onClick={() => handleAccept(item._id)}
                  style={{ flex: 1, padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Accept
                </button>
                <button
                  onClick={() => handleReject(item._id)}
                  style={{ flex: 1, padding: '8px 16px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}