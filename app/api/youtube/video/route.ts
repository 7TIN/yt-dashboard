import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const { videoId, title, description, accessToken } = await request.json();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    const response = await youtube.videos.update({
      part: ["snippet"],
      requestBody: {
        id: videoId,
        snippet: {
          title,
          description,
          categoryId: "22", // You might want to fetch this dynamically
        },
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update video" }, { status: 500 });
  }
}