'use client'

import { useRef, useState } from "react"

export default function Page() {
    const [tags, setTags] = useState<string[]>([]);
    const [name, setName] = useState<string>("");
    const [file, setFile] = useState<File>();
    const tagref = useRef(null);
    const addtag = () => {

        if (tagref.current != null) {
            const value = tagref.current?.value.trim();
            if (!value) return;
            setTags((e) => [...e, value]);
            tagref.current!.value = "";
            console.log(tags);

        }

    }
    const handlefilechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
        setFile(undefined);
        return;
    }
    setFile(files[0]);
};

    const publish = async () => {
        if (!file) return alert("Select ZIP file first");

        const formData = new FormData();

        formData.append("zip", file);
        formData.append("tags", JSON.stringify(tags));
        formData.append("name", name);

        try {
            const res = await fetch("http://localhost:4000/add/themes", { method: "POST", body: formData });
            if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
            const data = await res.json();
            console.log("Uploaded successfully:", data);
            alert("Theme uploaded successfully!");

        } catch (error) {
            console.error(error);
            alert("Theme Upload Failed,try again later");
        }
    }
    return (
        <div className="w-screen overflow-auto flex justify-center items-center h-screen bg-gradient-to-bl from-[#0d1b2a] to-[#415a77]">
            <div className="bg-[#778da9] w-[500px] h-[300px] rounded-3xl text-white p-5 grid grid-rows-3 gap-2">
                <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="Name" className="bg-[#0d1b2a] rounded-md col-span-2 pl-2" onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Tags" className="bg-[#0d1b2a] rounded-md pl-2" ref={tagref} />
                    <button className="bg-[#0d1b2a] self-end mr-5 h-full rounded-xl duration-25 border-2 border-[#0d1b2a] hover:border-white" onClick={addtag}>Add Tag</button>
                    <div className="col-span-2 flex">
                        <h1>Tags </h1>
                        {tags.map((tag, _index) => (
                            <h1 className="ml-2" key={_index}>{tag}</h1>
                        ))}
                    </div>
                </div>
                <br></br>
                <div className="grid grid-rows-2">
                    <h1>Select Theme</h1>
                    <input type="file" accept=".zip" className="bg-[#0d1b2a] w-56 rounded-xl p-2" onChange={handlefilechange} />
                </div>
                <button className="bg-[#0d1b2a] h-full rounded-xl duration-25 border-2 border-[#0d1b2a] hover:border-white" onClick={publish}>Publish</button>
            </div>
        </div>
    )
}