import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE "news" (
        "id" serial NOT NULL,
        "ownerId" integer,
        "content" varchar(1024),
        "picture" varchar(255),
        "createdTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
