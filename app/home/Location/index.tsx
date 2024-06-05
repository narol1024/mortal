"use client";

import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import { useGeolocation } from "@uidotdev/usehooks";

export const Location = observer(() => {
  const hasLocated = useRef(false);
  const { longitude, latitude } = useGeolocation();
  const { user } = useStores();
  useEffect(() => {
    if (longitude && latitude && !hasLocated.current) {
      user.updateLocation(longitude, latitude);
      hasLocated.current = true;
    }
  }, [longitude, latitude]);
  return <></>;
});
