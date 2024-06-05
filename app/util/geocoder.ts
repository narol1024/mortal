import nodeFetch from "node-fetch";

export async function geocoder(
  longitude: number | string,
  latitude: number | string
): Promise<{
  nation: string;
  province: string;
  status: number;
}> {
  const res = await nodeFetch(
    `https://apis.map.qq.com/ws/geocoder/v1/?key=${process.env.TENCENT_LBS_KEY}&location=${latitude},${longitude}`
  );
  const result = (await res.json()) as any;
  if (result.status === 0) {
    const address = result.result.address_component;
    return {
      nation: address.nation,
      province: address.province,
      status: 0,
    };
  }
  return Promise.reject("Failed to query geo");
}
