import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

export async function POST(request: Request) {
  try {
    const { secretKey } = await request.json();
    if (!secretKey) {
      throw new Error("secretKey required");
    }
    try {
      const md5 = createHash("md5");
      const pwd = md5.update(secretKey).digest("hex");
      const { rows } = await sql`SELECT * FROM users WHERE pwd=${pwd}`;
      if (rows.length === 1) {
        return new NextResponse(
          JSON.stringify({
            message: "Succeeded to login",
            result: {
              id: rows[0].id,
              avatarId: rows[0].avatarId,
              username: rows[0].username,
              secretKey,
            },
          })
        );
      }
      return NextResponse.json({ message: "Failed to login", result: {} });
    } catch (error) {
      return NextResponse.json({ message: "Failed to login", result: {} });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
