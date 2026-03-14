'use client'

import Theme from "@/app/theme";
import Header from "@/app/header";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Theme{
    _id:string,
    filename:string,
    url:string
}

const fetcher = (url:string)=>fetch(url).then(res=>{
    if(!res.ok) throw new Error('Fetch Failed');
    return res.json();
});



export default function Content(props:any) {
    const {page,collection,initialSearch} = props;
    const router = useRouter();
    const pageNumber = Number(page);
    const [images,setImages] = useState<Theme[]>([]);
    const [search,setSearch] = useState<string>(initialSearch);
    const [input,setInput] = useState<string>(initialSearch);
    const sortOptions = ['default','name','date'];
    const [sort,setSort] = useState<string>(sortOptions[0]);

    useEffect(()=>{
        const id = setTimeout(()=>{
            const params = new URLSearchParams();
            if(input) params.set('search',input);
            if(sort) params.set('sort',sort);
            router.replace(`/${collection}/${pageNumber}?${params.toString()}`);
            setSearch(input.trim())
        },1000)

        return ()=> clearTimeout(id)
    },[input,sort])
    const params = new URLSearchParams();
    if(search) params.set('search',search);
    if(sort) params.set('sort',sort);
    const apiUrl = `https://nsfwplaza.jajca.site/api/${collection}/${page}?${params.toString()}`;

    const {data,isLoading} = useSWR(apiUrl,fetcher);

    useEffect(()=>{
       if(data) setImages(data);
    },[data])

    return (
        <>
            <Header page={collection}/>
            <div className="min:w-screen h-8 bg-[#0d1b2a] text-white">
                <input placeholder="Search" value={input} className="w-[80%] h-full" onChange={e => setInput(e.target.value)}></input>
                <select onChange={(e)=>setSort(e.target.value)} value={sort} className="w-[19%] border-l-2 border-white">
                    {sortOptions.map((option,id)=>(
                        <option key={id}>{option}</option>
                    ))}
                </select>
            </div>
            <div className="min:w-screen min:h-screen h-fit flex flex-col justify-center items-center lg:grid lg:grid-cols-4 gap-4 bg-gradient-to-bl from-[#0d1b2a] to-[#415a77] p-5">
                {images.map((img: any) => (
                    <Theme data={img} type={collection} key={img._id}/>
                ))}
                <div className="flex m-auto justify-around items-center col-span-4 gap-5">
                    {pageNumber > 1 && (
                        <Link className="inline-block px-4 py-2 bg-[#0d1b2a] text-white rounded-xl hover:border-4 hover:border-white duration-25" href={`${pageNumber - 1}?search=${search}`}>Prev</Link>
                    )}
                    <Link className="inline-block px-4 py-2 bg-[#0d1b2a] text-white rounded-xl hover:border-4 hover:border-white duration-25" href={`${pageNumber + 1}?search=${search}`}>Next</Link>
                </div>
                {/*pages && (
                        <h1 className="text-white text-center col-span-4">{pageNumber} of {pages.pages}</h1>
                    )*/}
            </div>
        </>
    )
}