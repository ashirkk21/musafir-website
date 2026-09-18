import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Package from "@/lib/models/Package";

import initialPackages from "@/data/packages.json";

export async function GET() {
  try {
    await connectToDatabase();
    const dbPackages = await Package.find({}).lean();
    if (dbPackages && dbPackages.length > 0) {
      const dbIds = new Set(dbPackages.map((p) => p.id));
      const merged = [
        ...dbPackages,
        ...initialPackages.filter((p) => !dbIds.has(p.id))
      ];
      return NextResponse.json(merged);
    }
    return NextResponse.json(initialPackages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(initialPackages);
  }
}
