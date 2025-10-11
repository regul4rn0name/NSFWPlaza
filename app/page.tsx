import Image from "next/image";

export default async function Home() {
  const data = await fetch('http://localhost:3001/themes');
  const images = await data.json();
  console.log(images);
  
  return (
    <div>
      {images.map((img:any)=>(
        <div className="w-full h-full border-4 border-black" key={img._id}>
          <Image src={decodeURIComponent(img.base64)} alt={img.filename} width={400} height={400}></Image>
        </div>
      ))}
    </div>
  );
}
