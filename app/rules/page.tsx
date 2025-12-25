export default function Rules() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative bg-gradient-to-bl from-[#0d1b2a] to-[#415a77] 
                            text-white p-6 rounded-lg max-w-md w-full z-50">
                <h1 className="text-2xl font-bold mb-4">Rules</h1>
                <ol className="list-decimal list-inside space-y-2">
                    <li>No real people except celebrities</li>
                    <li>No children, loli, shots, etc.</li>
                    <li>Don't be stupid</li>
                </ol>
            </div>
        </div>
    )
}
