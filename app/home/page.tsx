"use client";

import React from "react";
import { Button, Image, Link } from "@nextui-org/react";
import { Cobe } from "./Cobe";
import { News } from "./News";
import { Publish } from "./Publish";
import { Register } from "./Register";
import { Login } from "./Login";
import avatar from "@/assets/logo.png";
import { useStores } from "@/hooks/userStores";
import { observer } from "mobx-react-lite";

const HomePage = observer(() => {
  const { user, news } = useStores();
  const userInfo = user.userInfo;
  const isLogined = !!userInfo.id;
  return (
    <div className="relative w-full">
      <Cobe />
      <Register />
      <Login />
      <Publish />
      <News />
      {!isLogined && (
        <div className="flex justify-center gap-10">
          <Button
            color="success"
            size="lg"
            variant="ghost"
            onClick={() => {
              user.showRegister();
            }}
          >
            创建帐号
          </Button>
          <Button
            color="warning"
            size="lg"
            variant="ghost"
            onClick={() => {
              user.showLogin();
            }}
          >
            登录
          </Button>
        </div>
      )}
      {isLogined && (
        <div className="flex justify-center flex-col gap-4">
          <p className="w-full text-center">{userInfo.username}，你好</p>
          <div className="flex justify-center">
            <Button
              size="lg"
              variant="ghost"
              onClick={() => {
                news.showPublish();
              }}
            >
              去分享
            </Button>
          </div>
        </div>
      )}
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
});

export default HomePage;
