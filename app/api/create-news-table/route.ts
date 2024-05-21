import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE News (
        Id serial NOT NULL,
        OwnerId integer,
        Content varchar(1024),
        Picture varchar(255),
        CreatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
