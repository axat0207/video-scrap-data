import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://1234:1234@cluster0.wir5xrk.mongodb.net/final-scrap-with-profile";

export async function GET() {
  let client;
  try {
    client = await MongoClient.connect(uri);
    const filmmakers_db = client.db("final-scrap-with-profile");
    const participants_collection = filmmakers_db.collection("stir-filmmakers");

    const participants = await participants_collection.find({}).toArray();

    return NextResponse.json(participants, { status: 200 });
  } catch (error) {
    console.error("Error fetching participants:", error);
    return NextResponse.json(
      {
        message: "Failed to fetch participants",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
