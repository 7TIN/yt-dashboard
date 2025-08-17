import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: session.accessToken,
    refresh_token: session.refreshToken,
  });

  const youtube = google.youtube("v3");

  // Replace with your uploaded video ID
  const videoId = process.env.MY_VIDEO_ID as string;

  const response = await youtube.videos.list({
    auth: oauth2Client,
    part: ["snippet", "statistics"],
    id: [videoId],
  });

  return NextResponse.json(response.data);
}
