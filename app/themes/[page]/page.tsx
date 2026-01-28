import Content from "@/app/content";

export default async function Page({ params,searchParams }:any){
    const {page} = await params
    const {search} = await searchParams
    return(
        <Content page={page} collection={'themes'} initialSearch={search || ''}/>
    );
}