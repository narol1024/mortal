import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { rows } = await sql`
    SELECT users.username, users."avatarId", news.content, news.id, News."createdTime"
    FROM news
    JOIN users ON News."ownerId" = users.Id;
    `;
    if (rows.length > 0) {
      return new NextResponse(
        JSON.stringify({
          message: "Succeeded to query news",
          result: rows,
        })
      );
    }
    return NextResponse.json({ message: "Failed to query news", result: [] });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
