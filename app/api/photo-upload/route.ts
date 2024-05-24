import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (filename) {
    try {
      // ⚠️ The below code is for App Router Route Handlers only
      const blob = await put(filename, request.body!, {
        access: "public",
      });

      // Here's the code for Pages API Routes:
      // const blob = await put(filename, request, {
      //   access: 'public',
      // });

      return NextResponse.json(blob);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }
  }
  return NextResponse.json({ error: "filename missing" }, { status: 500 });
}
