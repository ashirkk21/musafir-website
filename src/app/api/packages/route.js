import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Package from "@/lib/models/Package";

import initialPackages from "@/data/packages.json";

export async function GET() {
  try {
    await connectToDatabase();
    const dbPackages = await Package.find({}).lean();
    if (dbPackages && dbPackages.length > 0) {
      const jsonMap = new Map(initialPackages.map((p) => [p.id, p]));
      // Merge DB records with JSON base data so missing fields (like departureIslamabad) are filled in
      const mergedDb = dbPackages.map((dbPkg) => {
        const jsonPkg = jsonMap.get(dbPkg.id);
        return jsonPkg ? { ...jsonPkg, ...dbPkg } : dbPkg;
      });
      const dbIds = new Set(dbPackages.map((p) => p.id));
      const merged = [
        ...mergedDb,
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
