'use client'

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export default function Theme(props: any) {
  const data = props.data;
  const type = props.type;
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div className="bg-[#778da9] flex justify-center items-center flex-col p-3 rounded-3xl w-72 md:w-auto">
      <div className="w-80 h-96 scale-75 relative md:scale-100  m-5 " onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {hover && (
          <div className="absolute inset-0 flex justify-around items-center bg-black/50 z-20">
            <QRCodeSVG value={`http://localhost:4000/${type}/download/${encodeURIComponent(data.filename)}`} size={256} bgColor="#FFFFFF" fgColor="#000000" marginSize={5} />
          </div>
        )}
        <img
          src={`http://localhost:4000/${type}/previews/${encodeURIComponent(data.url)}.png`}
          alt={data.filename}
          className="object-contain w-full h-full"
        />


      </div>
      <a href={`http://localhost:4000/${type}/download/${encodeURIComponent(data.filename)}`}><button className="bg-[#e0e1dd] w-32 h-16 rounded-2xl border-4 border-[#e0e1dd] hover:border-black duration-25">Download</button></a>
    </div>



  )
}