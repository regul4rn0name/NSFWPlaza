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

const fetcher = async ([url, search]:[string,string | null ]) => {
  if (search) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ search }),
    })
    return res.json()
  }

  const res = await fetch(url)
  return res.json()
}

//`https://nsfwplaza.jajca.site/api/${collection}/length`

export default function Content(props:any) {
    const {page,collection,initialSearch} = props;
    const router = useRouter();
    const pageNumber = Number(page);
    const [images,setImages] = useState<Theme[]>([]);
    const [search,setSearch] = useState<string>(initialSearch);
    const [input,setInput] = useState<string>(initialSearch);

    useEffect(()=>{
        const id = setTimeout(()=>{
            const params = new URLSearchParams();
            if(input) params.set('search',input);
            router.replace(`/${collection}/${pageNumber}?${params.toString()}`);
            setSearch(input.trim())
        },1000)

        return ()=> clearTimeout(id)
    },[input])
    const {data,isLoading} = useSWR(
        search ? [`http://localhost:4000/themes/search/${page}`, search] : [`https://nsfwplaza.jajca.site/api/${collection}/${pageNumber}`,null], fetcher
    )
    useEffect(()=>{
       if(data) setImages(data);
    },[data])

    return (
        <>
            <Header page={collection}/>
            <div className="min:w-screen h-8 bg-[#0d1b2a] text-white">
                <input placeholder="Search" value={input} className="w-full h-full" onChange={e => setInput(e.target.value)}></input>
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