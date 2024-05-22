import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

export async function POST(request: Request) {
  try {
    const { secretKey, content } = await request.json();
    if (!secretKey || !content) {
      throw new Error("secretKey and content required");
    }
    const md5 = createHash("md5");
    const pwd = md5.update(secretKey).digest("hex");
    const { rows } = await sql`SELECT * FROM Users WHERE pwd=${pwd}`;
    if (rows.length === 1) {
      await sql`INSERT INTO news (content, "ownerId") VALUES (${content}, ${rows[0].id});`;
      return NextResponse.json({
        message: "Succeeded to publish",
        result: {
          content,
        },
      });
    } else {
      return NextResponse.json({ message: "Failed to publish", result: false });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
