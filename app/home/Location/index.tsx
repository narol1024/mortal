"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import { useGeolocation } from "@uidotdev/usehooks";

export const Location = observer(() => {
  const { longitude, latitude } = useGeolocation();
  const { user } = useStores();
  useEffect(() => {
    if (longitude && latitude) {
      user.updateLocation(longitude, latitude);
    }
  }, [longitude, latitude]);
  return <></>;
});
