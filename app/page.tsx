import ChatBar from "@/components/custom/ChatBar";
import Navbar from "@/components/custom/Navbar";
import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <div className="flex-1 flex justify-center items-end p-20">
        <ChatBar />
      </div>
    </div>
  );
};

export default Home;
