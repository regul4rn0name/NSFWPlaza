import Content from "@/app/content";

export default async function Page({ params }:any){
    const {page} = await params
    return(
        <Content page={page} collection={'badges'}/>
    );
}