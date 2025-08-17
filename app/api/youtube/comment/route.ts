import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get("videoId");

  const youtube = google.youtube({
    version: "v3",
    auth: process.env.YOUTUBE_API_KEY,
  });

  try {
    const response = await youtube.commentThreads.list({
      part: ["snippet"],
      videoId: videoId as string,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
    const { videoId, text, accessToken } = await request.json();

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({
        version: "v3",
        auth: oauth2Client,
    });

    try {
        const response = await youtube.commentThreads.insert({
            part: ["snippet"],
            requestBody: {
                snippet: {
                    videoId: videoId,
                    topLevelComment: {
                        snippet: {
                            textOriginal: text,
                        },
                    },
                },
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
    }
}


export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const commentId = searchParams.get("commentId");
    const accessToken = request.headers.get("Authorization")?.replace("Bearer ", "");


    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({
        version: "v3",
        auth: oauth2Client,
    });

    try {
        await youtube.comments.delete({
            id: commentId as string,
        });

        return NextResponse.json({ message: "Comment deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete comment" }, { status: 500 });
    }
}