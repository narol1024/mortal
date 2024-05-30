import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract query parameters for pagination
    const url = new URL(request.url);
    const _pageNum = url.searchParams.get("pageNum");
    const _pageSize = url.searchParams.get("pageSize");
    if (!_pageNum || !_pageSize) {
      throw new Error("pageNum and pageSize required");
    }
    const pageNum = parseInt(_pageNum, 10);
    const pageSize = parseInt(_pageSize, 10);
    const offset = pageNum * pageSize;

    const { rows } = await sql`
      SELECT 
        users.username,
        news.id,
        users."avatarId",
        news.content,
        news.picture,
        news."createdTime" AT TIME ZONE 'UTC' AS "createdTime",
        news.longitude,
        news.latitude,
        news."pictureWidth",
        news."pictureHeight"
      FROM news 
      JOIN users ON News."ownerId" = users.Id
      WHERE news.status = 1
      ORDER BY news."createdTime" DESC
      LIMIT ${pageSize}
      OFFSET ${offset}
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
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
