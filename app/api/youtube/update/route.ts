import { google } from "googleapis";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Make sure your authOptions are imported

export async function PUT(request: Request) {
  // 1. Get the session to ensure the user is authenticated
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Parse the request body
    const { videoId, title, description } = await request.json();

    if (!videoId || !title || !description) {
      return NextResponse.json({ error: "Missing required fields: videoId, title, or description" }, { status: 400 });
    }

    // 3. Set up an authenticated OAuth2 client
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });

    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    // 4. Call the YouTube Data API to update the video
    const response = await youtube.videos.update({
      part: ["snippet"],
      requestBody: {
        id: videoId,
        snippet: {
          title: title,
          description: description,
          // The categoryId is required by the API when updating a snippet.
          // "28" is for "Science & Technology". You might want to fetch the video's
          // current categoryId first to avoid changing it unintentionally.
          categoryId: "28",
        },
      },
    });

    // 5. Return the successful response
    return NextResponse.json(response.data, { status: 200 });

  } catch (error) {
    console.error("Failed to update video:", error);
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
  }
}