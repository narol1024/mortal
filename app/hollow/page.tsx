"use client";

import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Cobe } from "./Cobe";
import { News } from "./News";
import { Publish } from "./Publish";
import { Login } from "./Login";
import { UserData } from "./types";

export default function Hollow() {
  const [userData] = useLocalStorage<UserData | null>("user", null);
  const [showNews, setShowNews] = useState(false);
  return (
    <div className="relative w-full">
      <Cobe />
      <News />
      {!userData && <Login />}
      {userData && <Publish />}
    </div>
  );
}
