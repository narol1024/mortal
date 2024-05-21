"use client";

import React from "react";
import { Image, Link } from "@nextui-org/react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Cobe } from "./Cobe";
import { News } from "./News";
import { Publish } from "./Publish";
import { Login } from "./Login";
import { UserData } from "./types";
import avatar from "@/assets/logo.png";

export default function App() {
  const [userData] = useLocalStorage<UserData | null>("user", null);
  return (
    <div className="relative w-full">
      <Cobe />
      <News />
      {!userData && <Login />}
      {userData && <Publish />}
      <div className="flex justify-center items-center mt-10 gap-2">
        <Image height={48} src={avatar.src} width={48} />
        <Link
          underline="always"
          color="primary"
          href="https://zhuanlan.zhihu.com/p/618759829"
          target="_blank"
        >
          了解Mortal的故事
        </Link>
      </div>
    </div>
  );
}
