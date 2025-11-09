import Theme from "@/app/theme";
import Header from "@/app/header";
import Image from "next/image";
import Link from "next/link";



export default async function Page({ params }:any) {
    const {page} = await params;
    const pageNumber = Number(page);
    const data = await fetch(`https://nsfwplaza.jajca.site/api/themes/${pageNumber}`);
    const length = (await fetch(`https://nsfwplaza.jajca.site/api/themes/length`));
    const pages = await length.json();
    
    const images = await data.json();

    return (
        <>
            <Header page={'themes'}/>
            <div className="min:w-screen min:h-screen h-fit flex flex-col justify-center items-center lg:grid lg:grid-cols-4 gap-4 bg-gradient-to-bl from-[#0d1b2a] to-[#415a77] p-5">
                {images.map((img: any) => (
                    <Theme data={img} type={'themes'} key={img._id}/>
                ))}
                <div className="flex m-auto justify-around items-center col-span-4 gap-5">
                    {pageNumber > 1 && (
                        <Link className="inline-block px-4 py-2 bg-[#0d1b2a] text-white rounded-xl hover:border-4 hover:border-white duration-25" href={`${pageNumber - 1}`}>Prev</Link>
                    )}
                    <Link className="inline-block px-4 py-2 bg-[#0d1b2a] text-white rounded-xl hover:border-4 hover:border-white duration-25" href={`${pageNumber + 1}`}>Next</Link>
                </div>
                {/*pages && (
                        <h1 className="text-white text-center col-span-4">{pageNumber} of {pages.pages}</h1>
                    )*/}
            </div>
        </>
    )
}