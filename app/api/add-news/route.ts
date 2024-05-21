import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { sk, content } = await request.json();
    if (!sk || !content) {
      throw new Error("sk and content required");
    }
    const { rows } = await sql`SELECT * FROM Users WHERE Sk=${sk}`;
    if (rows.length === 1) {
      await sql`INSERT INTO News (Content, OwnerId) VALUES (${content}, ${rows[0].id});`;
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
    return NextResponse.json({ error }, { status: 500 });
  }
}
