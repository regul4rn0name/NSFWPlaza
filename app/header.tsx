import Link from "next/link";

export default function Header(props:any){
    const page = props.page;
    return(
        <div className="w-screen bg-[#91a9c7] static flex justify-center gap-5">
            <Link className={`transition-all ${page=='themes' ? 'underline decoration-2 pointer-events-none':'hover:font-bold '}`} href={'/themes/1'}>Themes</Link>
            <Link className={`transition-all ${page=='splashes' ? 'underline decoration-2 pointer-events-none':'hover:font-bold '}`} href={'/splashes/1'}>Splashes</Link>
            <Link className={`transition-all ${page=='badges' ? 'underline decoration-2 pointer-events-none':'hover:font-bold '}`} href={'/badges/1'}>Badges</Link>
        </div>
    );
}