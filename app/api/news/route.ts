import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { rows } = await sql`
    SELECT Users.Username, News.Content, News.id, News.CreatedTime
    FROM News
    JOIN Users ON News.OwnerId = Users.Id;
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
    return NextResponse.json({ error }, { status: 500 });
  }
}
