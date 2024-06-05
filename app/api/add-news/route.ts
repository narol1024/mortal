import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { geocoder } from '../../util/geocoder';

export async function POST(request: Request) {
  try {
    const {
      secretKey,
      content,
      picture,
      pictureWidth,
      pictureHeight,
      longitude,
      latitude,
    } = await request.json();
    if (!secretKey || !content) {
      throw new Error("secretKey and content required");
    }
    const md5 = createHash("md5");
    const pwd = md5.update(secretKey).digest("hex");
    const { rows } = await sql`SELECT * FROM Users WHERE pwd=${pwd}`;
    if (rows.length === 1) {
      const res = await geocoder(longitude, latitude);
      if (res.status === 0) {
        await sql`INSERT INTO news ("ownerId", content, picture, "pictureWidth", "pictureHeight", longitude, latitude, "locationNation", "locationProvince") VALUES (${rows[0].id}, ${content}, ${picture}, ${pictureWidth}, ${pictureHeight},${longitude}, ${latitude}, ${res.nation}, ${res.province});`;
        return NextResponse.json({
          message: "Succeeded to publish",
          result: {
            content,
          },
        });
      }
      return NextResponse.json({ message: "Failed to publish", result: false });
    } else {
      return NextResponse.json({ message: "Failed to publish", result: false });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
