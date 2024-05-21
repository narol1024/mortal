"use client";

import React from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Cobe } from "./Cobe";
import { News } from "./News";
import { Publish } from "./Publish";
import { Login } from "./Login";
import { UserData } from "./types";

export default function App() {
  const [userData] = useLocalStorage<UserData | null>("user", null);
  return (
    <div className="relative w-full">
      <Cobe />
      <News />
      {!userData && <Login />}
      {userData && <Publish />}
    </div>
  );
}
