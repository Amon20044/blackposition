import Link from "next/link";
import LoginComponent from "@/component/LoginComponent";
import Logo from "@/component/logoDisp";
import {FaFacebook} from "react-icons/fa";

export default function Login() {

  return (
      <div className="flex flex-row max-[750px]:flex-col bg-black w-screen">
        <Logo/>
        <div className="w-[50%] max-[750px]:w-screen space-y-8 h-screen form bg-white ">

          <div className="text-5xl max-[1030px]:text-4xl">Login to Leads Portal</div>
          <div className="w-[90%] h-[1px] bg-slate-200"></div>
          <LoginComponent/>
          <div>
            <span className="w-[15vw] h-[1px] bg-slate-200">

            </span>
            <span className="">
            OR
            </span>
            <span className="w-[15vw] h-[2px] bg-slate-200">

            </span>
          </div>
          <Link  className="bg-blue-500 font-semibold text-center text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 w-[30vw] max-[750px]:w-[90vw]" href={`https://www.facebook.com/v21.0/dialog/oauth?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.HOST}/api/auth&scope=leads_retrieval%20ads_read%20email`}>
            <FaFacebook className="text-white text-2xl" />
            Login with Facebook
          </Link>

        </div>
      </div>
  )
}
