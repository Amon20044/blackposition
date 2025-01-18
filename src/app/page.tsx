import Link from "next/link";
import LoginComponent from "@/component/LoginComponent";
import Logo from "@/component/logoDisp";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import hero from "@/public/heroLead.png"
export default function Login() {

  return (
    <div className="relative w-screen h-screen bg-black">
      {/* Background Image */}
      <div className="absolute w-full h-screen z-10">
        <Image
          src={hero}
          alt="Hero Background"
          fill={true}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col h-full relative">
        <div className="z-10 flex flex-row max-[750px]:flex-col flex-1 items-center justify-between">
          <div className="flex items-center justify-center flex-1 p-8">
            <Logo />
          </div>
          <div className="flex flex-col flex-1 items-center justify-center ">
            <LoginComponent />
          </div>
        </div>
      </div>
    </div>
  )
}


