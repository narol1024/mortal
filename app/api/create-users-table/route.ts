import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`
      CREATE TABLE "users" ( 
        "id" serial NOT NULL, 
        "username" varchar(255), 
        "avatarId" int, 
        "pwd" varchar(255),
        "createdTime" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
