import { getRandomString } from "./randomString";

let credentials: any = null;

/**
 * 判断临时凭证是否到期。
 **/
function isCredentialsExpired(credentials: any) {
  if (!credentials) {
    return true;
  }
  const expireDate = new Date(credentials.Expiration);
  const now = new Date();
  // 如果有效期不足一分钟，视为过期。
  return expireDate.getTime() - now.getTime() <= 60000;
}

export async function uploadFileOnAliCloudOSS(file: File): Promise<{
  url: string;
}> {
  // 临时凭证过期时，才重新获取，减少对STS服务的调用。
  if (isCredentialsExpired(credentials)) {
    try {
      const response = await fetch("/api/ali-cloud-sts", {
        method: "GET",
      });
      const resJson = await response.json();
      credentials = resJson.result;
    } catch (error) {
      return Promise.reject(new Error("Failed to get STS"));
    }
  }
  try {
    const client = new window.OSS({
      accessKeyId: credentials.AccessKeyId,
      accessKeySecret: credentials.AccessKeySecret,
      stsToken: credentials.SecurityToken,
      bucket: "mortal-app",
      region: "oss-cn-beijing",
    });

    const fileName = `${getRandomString(6)}_${new Date().getTime()}`;
    const result = await client.put(`pictures/${fileName}`, file);
    if (result.res.status === 200) {
      return Promise.resolve({
        url: result.url,
      });
    }
    return Promise.reject(new Error("Failed to upload file"));
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error("Failed to upload file"));
  }
}
