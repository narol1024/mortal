import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE "news" (
        "id" serial NOT NULL,
        "ownerId" integer,
        "content" varchar(1024),
        "picture" varchar(256),
        "pictureWidth" integer
        "pictureHeight" integer
        "createdTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "latitude" float,
        "longitude" float
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
