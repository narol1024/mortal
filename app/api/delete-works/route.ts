import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

export async function POST(request: Request) {
  try {
    const { secretKey, id } = await request.json();
    if (!secretKey || !id) {
      throw new Error("secretKey and id required");
    }
    const md5 = createHash("md5");
    const pwd = md5.update(secretKey).digest("hex");
    const { rows } = await sql`SELECT * FROM Users WHERE pwd=${pwd}`;
    if (rows.length === 1) {
      await sql`
        UPDATE "news"
        SET "status" = 0
        WHERE "id" = ${id} AND "ownerId" = ${rows[0].id}
    `;
      return NextResponse.json({
        message: "Succeeded to delete",
        result: true,
      });
    } else {
      return NextResponse.json({ message: "Failed to delete", result: false });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
