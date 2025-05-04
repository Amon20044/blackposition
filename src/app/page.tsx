import LoginComponent from "@/component/LoginComponent";
import logo from "@/public/blackPosition.svg";
import Image from "next/image";
import hero from "@/public/heroLead.png"
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
export default function Login() {

  return (
    <div className="relative w-screen h-screen bg-black">
      {/* Background Image */}
      <div className="absolute w-full h-screen z-10 ">
        <Image
          src={hero}
          alt="Hero Background"
          fill={true}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col h-full relative">
        <div className="z-10 flex flex-row max-[750px]:flex-col items-center justify-between">
          <div className="flex items-center justify-center p-8 w-[50vw] h-[100vh] max-[750px]:w-[100vw] max-[750px]:h-[150px]">
          <Image
                src={logo}
                alt="Black Position"
                // sizes="50vw"
                style={{ objectFit: "cover" }}
            />
          </div>
          <div className="flex flex-col w-[50vw] h-[100vh] items-center justify-center max-[750px]:w-[100vw] max-[750px]:h-[70vh] ">
            <div className=" bg-black shadow text-white rounded-xl p-8">
            <LoginComponent />
            <Link
              href={`https://www.facebook.com/v21.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.HOST}/api/auth&scope=leads_retrieval%20ads_read%20email`}
              className=" hover:bg-blue-700 transition Fb-button flex flex-row justify-center items-center mt-6"
            >
              <FaFacebook className="text-white text-xl" />
              <div>
                Login with Facebook
              </div>
            </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}


