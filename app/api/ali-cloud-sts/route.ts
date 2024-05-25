import { STS } from "ali-oss";
import { NextResponse } from "next/server";

export async function GET() {
  const sts = new STS({
    accessKeyId: process.env.ALIOSS_ACCESS_KEY_ID!,
    accessKeySecret: process.env.ALIOSS_ACCESS_KEY_SECRET!,
  });

  try {
    const result = await sts.assumeRole(
      "acs:ram::1956922580941563:role/ramossformortal",
      "",
      3000,
      "ramossformortal"
    );
    return new NextResponse(
      JSON.stringify({
        message: "Succeeded to query get AliCloud STS",
        result: {
          AccessKeyId: result.credentials.AccessKeyId,
          AccessKeySecret: result.credentials.AccessKeySecret,
          SecurityToken: result.credentials.SecurityToken,
        },
      })
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 400 });
  }
}
