'use client'

import Link from "next/link";
import { useEffect, useState } from "react"

export default function Announcement() {
    const [hidden, setHidden] = useState<boolean>(false);
    useEffect(()=>{
        const hide = localStorage.getItem('hideComponent');
        if(hide === 'true') setHidden(true);
    },[])
    const dontshow = () => {
        localStorage.setItem('hideComponent','true')
        setHidden(true);
    }
    return (
        <>
            {!hidden && (
                <div className="z-50 md:w-lg w-80 h-80 bg-gradient-to-bl text-white from-[#0d1b2a] to-[#415a77] absolute top-[25%] left-1/2 -translate-x-1/2 rounded-2xl md:p-10 p-5 m-auto">
                    <h1>Support me!</h1>
                    <h2>Hosting website costs money,right now I pay for it myself if you would like to help me you can do it here</h2>
                    <div className="w-full grid grid-cols-7 md:gap-7 gap-1 mt-5">
                        <button className="bg-[#e0e1dd] col-span-2 w-full h-16 text-[13px] rounded-2xl border-4 border-[#e0e1dd] hover:border-black duration-25 text-black" onClick={dontshow}>Don't show again</button>
                        <button className="bg-[#e0e1dd] col-span-2 w-full h-16 text-[13px] rounded-2xl border-4 border-[#e0e1dd] hover:border-black duration-25 text-black" onClick={()=>setHidden(true)}>Close</button>
                        <Link className="w-full col-span-3 text-[13px]"  href={'https://buymeacoffee.com/eblo'}><button className="bg-[#232c8f] w-full h-16 rounded-2xl border-4 col-span-2 border-[#232c8f] hover:border-black duration-25" onClick={dontshow}>Support me!</button></Link>
                    </div>
                </div>
            )}
        </>
    )
}