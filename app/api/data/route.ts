import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

// MongoDB connection string
const uri =
  "mongodb+srv://1234:1234@cluster0.wir5xrk.mongodb.net/video_participants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  let client;
  try {
    // Connect to MongoDB
    client = await MongoClient.connect(uri);

    // Select database and collection
    const filmmakers_db = client.db("filmmakers");
    const participants_collection = filmmakers_db.collection("participants");

    // Fetch all data from the collection
    const participants = await participants_collection.find({}).toArray();

    // Return the data
    res.status(200).json(participants);
  } catch (error) {
    // Handle any errors
    console.error("Error fetching participants:", error);
    res.status(500).json({
      message: "Failed to fetch participants",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  } finally {
    // Close the MongoDB connection
    if (client) {
      await client.close();
    }
  }
}
