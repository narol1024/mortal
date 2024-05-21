import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, sk } = await request.json();
    if (!username || !sk) {
      throw new Error("username and sk required");
    }
    await sql`INSERT INTO Users (Username, Sk) VALUES (${username}, ${sk})`;
    return NextResponse.json({
      message: "Added user",
      result: {
        username,
        sk,
      },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
