import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { createHash } from "crypto";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const _pageNum = url.searchParams.get("pageNum");
    const _pageSize = url.searchParams.get("pageSize");
    const secretKey = url.searchParams.get("secretKey");
    if (!_pageNum || !_pageSize || !secretKey) {
      throw new Error("pageNum and pageSize and secretKey required");
    }
    const pageNum = parseInt(_pageNum, 10);
    const pageSize = parseInt(_pageSize, 10);
    const offset = pageNum * pageSize;

    try {
      const md5 = createHash("md5");
      const pwd = md5.update(secretKey).digest("hex");
      const { rows: users } = await sql`SELECT * FROM users WHERE pwd=${pwd}`;
      if (users.length === 1) {
        const { rows } = await sql`
        SELECT users.username, news.id, users."avatarId", news.content, news.picture, news."createdTime" AT TIME ZONE 'UTC' AS "createdTime", news.longitude, news.latitude
        FROM news 
        JOIN users ON News."ownerId" = users.Id
        WHERE news."ownerId" = ${users[0].id} AND news.status = 1
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
      }
      return NextResponse.json({ message: "Failed to query news", result: [] });
    } catch (error) {
      return NextResponse.json({ message: "Failed to query news", result: [] });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
