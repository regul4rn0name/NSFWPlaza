'use client'

export default function Page() {
    return (
        <div className="w-screen overflow-auto flex justify-center items-center h-screen bg-gradient-to-bl from-[#0d1b2a] to-[#415a77]">
            <div className="bg-[#778da9] w-[500px] h-[250px] rounded-3xl text-white p-5 grid grid-rows-2 gap-2">
                <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Name" className="bg-[#0d1b2a] rounded-md col-span-2 pl-2" />
                    <input type="text" placeholder="Tags" className="bg-[#0d1b2a] rounded-md pl-2" />
                    <button className="bg-[#0d1b2a] self-end mr-5 h-full rounded-xl duration-25 border-2 border-[#0d1b2a] hover:border-white">Add Tag</button>
                </div>
                <input type="file" accept=".zip" />
                <input type="file" accept=".png" />
                <button className="bg-[#0d1b2a] self-end ml-5">Publish</button>
            </div>
        </div>
    )
}