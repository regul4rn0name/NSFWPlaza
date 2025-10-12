import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-[#0d1b2a] to-[#415a77] flex justify-center items-center">
      <div className="h-36 w-64 flex flex-col justify-center items-center gap-4">
        <h1 className="text-white text-center">Are you 18+ ?</h1>
        <div className="flex gap-4">
          <a href="https://www.youtubekids.com">
            <button className="px-4 py-2 bg-red-500 text-white rounded">No</button>
          </a>
          <Link href={'/themes/1'}>
            <button className="px-4 py-2 bg-green-500 text-white rounded">Yes</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
