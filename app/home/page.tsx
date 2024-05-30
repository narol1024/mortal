"use client";

import React from "react";
import {
  Button,
  Image,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";
import { Cobe } from "./Cobe";
import { News } from "./News";
import { Post } from "./Post";
import { Location } from "./Location";
import { Register } from "./Register";
import { Login } from "./Login";
import { Works } from "./Works";
import avatar from "@/assets/logo.png";
import { useStores } from "@/hooks/useStores";
import { observer } from "mobx-react-lite";
import {
  List as ListIcon,
  KeyRound as KeyRoundIcon,
  Aperture as ApertureIcon,
  LogOut as LogOutIcon,
} from "lucide-react";
import { useSecretKeyModal } from "@/hooks/useSecretKey";

const HomePage = observer(() => {
  const { user, news, profile } = useStores();
  const { showSecretKeyModal } = useSecretKeyModal();

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
        <Works />
        <Location />
        <Button
          isIconOnly
          variant="light"
          className="absolute z-10 top-0 left-0"
          // FIXME: why using asolute, the onPress can not work.
          // workaround: using onCick instead of onPress
          onClick={() => {
            news.showNewListModal();
          }}
        >
          <ListIcon width={32} height={32} />
        </Button>
        {!isLogined && (
          <div className="flex justify-center gap-8">
            <Button
              color="success"
              size="lg"
              variant="ghost"
              onPress={() => {
                user.showRegister();
              }}
            >
              创建帐号
            </Button>
            <Button
              color="warning"
              size="lg"
              variant="ghost"
              onPress={() => {
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
            <div className="flex justify-center gap-8">
              <Button
                color="success"
                size="lg"
                variant="ghost"
                onPress={() => {
                  news.showPostingModal();
                }}
              >
                去分享
              </Button>
              <Dropdown showArrow>
                <DropdownTrigger>
                  <Button size="lg" variant="ghost">
                    个人中心
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  variant="faded"
                  aria-label="Dropdown menu with description"
                >
                  <DropdownSection showDivider>
                    <DropdownItem
                      key="key"
                      startContent={<KeyRoundIcon size={22} />}
                      onPress={() => {
                        showSecretKeyModal({
                          publickKey: user.userInfo.secretKey!,
                        });
                      }}
                    >
                      个人秘钥
                    </DropdownItem>
                    <DropdownItem
                      key="works"
                      startContent={<ApertureIcon size={22} />}
                      onPress={() => {
                        profile.showWorksListModal();
                      }}
                    >
                      作品管理
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection>
                    <DropdownItem
                      key="works"
                      className="text-danger"
                      color="danger"
                      startContent={<LogOutIcon size={22} />}
                      onPress={() => {
                        user.logout();
                      }}
                    >
                      退出登录
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
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
