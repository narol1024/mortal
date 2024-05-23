"use client";

import React from "react";
import { Button, Image, Link } from "@nextui-org/react";
import { Cobe } from "./Cobe";
import { News } from "./News";
import { Post } from "./Post";
import { Location } from "./Location";
import { Register } from "./Register";
import { Login } from "./Login";
import avatar from "@/assets/logo.png";
import { useStores } from "@/hooks/useStores";
import { observer } from "mobx-react-lite";

const HomePage = observer(() => {
  const { user, news } = useStores();
  const userInfo = user.userInfo;
  const isLogined = !!userInfo.id;
  return (
    <>
      <div className="relative w-full">
        <Cobe />
        <Register />
        <Login />
        <Post />
        <News />
        <Location />
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
      </div>
      <div className="absolute bottom-10 left-0 w-full flex justify-center items-center gap-2">
        <Image height={48} src={avatar.src} width={48} />
        <Link
          underline="always"
          color="foreground"
          href="https://www.baike.com/wikiid/7353255952306618408"
          target="_blank"
        >
          Mortal的故事
        </Link>
      </div>
    </>
  );
});

export default HomePage;
