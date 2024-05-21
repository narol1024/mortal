import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { sk } = await request.json();
    if (!sk) {
      throw new Error("sk required");
    }
    const { rows } = await sql`SELECT * FROM Users WHERE Sk=${sk}`;
    if (rows.length === 1) {
      return new NextResponse(
        JSON.stringify({
          message: "Succeeded to recover",
          result: {
            username: rows[0].username,
            sk: rows[0].sk,
          },
        })
      );
    }
    return NextResponse.json({ message: "Failed to recover", result: false });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
