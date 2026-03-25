'use client'

import Link from "next/link";
import { useRef, useState } from "react"
import Rules from "../rules/page";
import JSZip from "jszip";

export default function Page() {
    const [rules, setRules] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const [name, setName] = useState<string>("");
    const [file, setFile] = useState<File>();
    const tagref = useRef<HTMLInputElement>(null);
    const addtag = () => {

        if (tagref.current != null) {
            const value = tagref.current?.value.trim();
            if (!value) return;
            setTags((e) => [...e, value]);
            tagref.current!.value = "";
            console.log(tags);

        }

    }
    const detectCollection = async (file:File,):string=>{
        let detectedCollection:string = "badges";
        try {
            if(!file) throw(undefined)
            const arrayBuffer = await file.arrayBuffer();
            const zip = await JSZip.loadAsync(arrayBuffer);
            const files = Object.keys(zip.files);
            if (files.some(f => f.endsWith("body_LZ.bin"))) {
                detectedCollection = "themes";
            } else if (files.some(f => f.endsWith("splash.bin"))) {
                detectedCollection = "splashes"
            } else {
                detectedCollection = "badges"
            }
            console.log(detectedCollection);
        }
        catch (error) {
            console.log(error);
        }
        return detectedCollection;
    }
    const handlefilechange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const collection = await detectCollection(file);
        formData.append("zip", file);
        formData.append("tags", JSON.stringify(tags));
        formData.append("name", name);

        try {
            const res = await fetch(`https://nsfwplaza.jajca.site/api/add/${collection}`, { method: "POST", body: formData });
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

        <div className="w-screen overflow-auto flex flex-col justify-center items-center h-screen bg-gradient-to-bl from-[#0d1b2a] to-[#415a77]">
            {rules == true && (<><Rules /> <button onClick={() => setRules(false)} className="text-white hover:font-bold transition-all bg-black w-16 h-16 m-2 rounded-xl z-50">Close</button></>)}
            <Link href={"/themes/1"} className="text-white m-5 hover:font-bold transition-all">Main Menu</Link>
            <button onClick={() => setRules(true)} className="text-white m-5 hover:font-bold transition-all">RULES</button>
            <div className="bg-[#778da9] w-[300px] md:w-[500px] rounded-3xl text-white p-5 flex flex-col gap-2">
                <div className=" flex flex-col gap-2">
                    <input type="text" placeholder="Name" className="bg-[#0d1b2a] rounded-md col-span-2 pl-2" onChange={(e) => setName(e.target.value)} />
                    <div className="flex gap-2 h-12">
                        <input type="text" placeholder="Tags" className="bg-[#0d1b2a] rounded-md pl-2" ref={tagref} />
                        <button className="bg-[#0d1b2a] self-end mr-5 h-full rounded-xl duration-25 border-2 border-[#0d1b2a] hover:border-white" onClick={addtag}>Add Tag</button>
                    </div>
                    <div>
                        <h1 className="mb-1">Tags</h1>

                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, _index) => (
                                <span
                                    key={_index}
                                    className="bg-[#0d1b2a] px-2 py-1 rounded-md text-sm break-words"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-col gap-2">
                    <h1>Select Theme</h1>
                    <input type="file" accept=".zip" className="bg-[#0d1b2a] w-56 rounded-xl p-2" onChange={handlefilechange} />
                </div>
                <button className="bg-[#0d1b2a] h-full rounded-xl duration-25 border-2 border-[#0d1b2a] hover:border-white" onClick={publish}>Publish</button>
            </div>
        </div>
    )
}