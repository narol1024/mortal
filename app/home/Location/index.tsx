"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "@/hooks/useStores";
import { useGeolocation } from "@uidotdev/usehooks";

export const Location = observer(() => {
  const locationResult = useGeolocation();
  const { location } = useStores();

  useEffect(() => {
    if (locationResult.longitude && locationResult.latitude) {
      location.updateLongitude(locationResult.longitude);
      location.updateAltitude(locationResult.latitude);
    }
  }, [locationResult]);
  return <></>;
});
