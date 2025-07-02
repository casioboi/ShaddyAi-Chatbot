'use client';
import { assets } from "@/assets/assets";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import PromptBox from "@/components/PromptBox";
import { useState } from "react";
import Message from "@/components/Message";

export default function Home() {

  const [expand, setExpand] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className="flex h-screen">
        <Sidebar expand={expand} setExpand={setExpand}/>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidvden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => (expand ? setExpand(false) : setExpand(true))}
              className="rotate-180"
              src={assets.menu_icon}
              alt=""
            />
            <Image className="opacity-70" src={assets.chat_icon} alt="" />
          </div>

          {messages.length === 0 ? (
            <>
              <div className="flex items-center gap-2">
                <Image src={assets.logo_icon} alt="" className="h-7 w-9" />
                <p className="text-2xl font-medium">Hi, I'm ShaddyAi</p>
              </div>
              <p className="text-sm mt-2 ml-10">How can I help you today?</p>
            </>
          ) :
           (
            <div>
              <Message role='user' content='What is next js'/>
            </div>
          )
          }
          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading}/>
          <p className="text-xs absolute bottom-1 text-gray-500">This content is AI-assisted and intended as a draft. </p>
        </div>
      </div>
    </div>
  );
}
