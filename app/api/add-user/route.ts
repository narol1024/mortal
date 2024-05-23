import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { getRandomString } from "@/util/randomString";

export async function POST(request: Request) {
  try {
    const { username, avatarId = 0 } = await request.json();
    if (!username) {
      throw new Error("username and avatarId required");
    }
    const secretKey = getRandomString(64);
    const md5 = createHash("md5");
    const pwd = md5.update(secretKey).digest("hex");
    const { rows } =
      await sql`INSERT INTO users ("username", "avatarId", "pwd") VALUES (${username}, ${avatarId} ,${pwd}) RETURNING id`;
    if (rows.length === 1) {
      return NextResponse.json({
        message: "Added user",
        result: {
          id: rows[0].id,
          username,
          avatarId,
          secretKey,
        },
      });
    } else {
      return NextResponse.json({
        message: "Failed to add user",
        result: {},
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
