"use client";

import { useEffect, useState } from "react";

type Item = {
  _id: string;
  filename: string;
  url: string;
  tags: string[];
};

const predefinedTags = ["Girl", "Boy", "No Nudity", "Gore", "Anime", "Humor","Furry","Real"];
const collections = ["themes", "badges", "splashes"];

export default function TaggingPage() {
  const [collection, setCollection] = useState<string>("themes");
  const [items, setItems] = useState<Item[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setCurrentIndex(0);
      setSelectedTags([]);
      try {
        const res = await fetch(`https://nsfwplaza.jajca.site/api/${collection}/empty-tags`);
        const data: Item[] = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching items:", err);
        setItems([]);
      }
      setLoading(false);
    };
    fetchItems();
  }, [collection]);

  const currentItem = items[currentIndex];

  // Toggle predefined tags
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Add custom tag
  const addCustomTag = () => {
    const trimmed = customTag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags([...selectedTags, trimmed]);
      setCustomTag("");
    }
  };

  // Save tags and go to next item
  const handleNext = async () => {
    if (!currentItem) return;

    try {
      await fetch(`https://nsfwplaza.jajca.site/api/${collection}/${currentItem._id}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: selectedTags }),
      });
    } catch (err) {
      console.error("Failed to save tags:", err);
    }

    // Move to next item
    setSelectedTags([]);
    setCurrentIndex((prev) => prev + 1);
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!currentItem) return <p className="text-center mt-10 text-white">No items left.</p>;

  // Image URL logic (your existing code)
  const previewUrl = `https://nsfwplaza.jajca.site/api/${collection}/previews/${encodeURIComponent(
    currentItem.url
  )}.png`;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-5">
      {/* Collection buttons */}
      <div className="flex gap-2 mb-4">
        {collections.map((col) => (
          <button
            key={col}
            onClick={() => setCollection(col)}
            className={`px-4 py-2 rounded shadow ${
              collection === col ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            {col}
          </button>
        ))}
      </div>

      {/* Item card */}
      <div className="bg-[#778da9] flex flex-col items-center p-3 rounded-3xl w-72 md:w-auto">
        <div className="w-80 h-96 scale-75 md:scale-100 relative">
          <img src={previewUrl} alt={currentItem.filename} className="object-contain w-full h-full rounded" />
        </div>

        {/* Predefined tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {predefinedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full border ${
                selectedTags.includes(tag)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Custom tag input */}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            placeholder="Add custom tag"
            className="px-3 py-1 border rounded w-full"
          />
          <button onClick={addCustomTag} className="px-4 py-1 bg-green-500 text-white rounded">
            Add
          </button>
        </div>

        {/* Selected tags */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedTags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-200 rounded-full text-gray-800">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Next button */}
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-blue-600 text-white rounded shadow mt-4 hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
