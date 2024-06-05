import { geocoder } from "@/util/geocoder";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const longitude = url.searchParams.get("longitude");
    const latitude = url.searchParams.get("latitude");
    if (!longitude || !latitude) {
      throw new Error("longitude and latitude required");
    }
    const res = await geocoder(longitude, latitude);
    if (res.status === 0) {
      return NextResponse.json({ message: "Succeeded to query", result: res });
    }
    return NextResponse.json({ message: "Failed to query", result: null });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
