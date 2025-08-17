// lib/youtube.ts
import { google } from "googleapis";

export function getYoutubeClient(accessToken: string) {
  return google.youtube({
    version: "v3",
    auth: accessToken,
  });
}

// Example: fetch video details
export async function getVideoDetails(accessToken: string, videoId: string) {
  const youtube = getYoutubeClient(accessToken);
  const response = await youtube.videos.list({
    part: ["snippet", "statistics"],
    id: [videoId],
  });
  return response.data.items?.[0];
}

// Example: post comment
export async function postComment(
  accessToken: string,
  videoId: string,
  text: string
) {
  const youtube = getYoutubeClient(accessToken);
  return youtube.commentThreads.insert({
    part: ["snippet"],
    requestBody: {
      snippet: {
        videoId,
        topLevelComment: {
          snippet: { textOriginal: text },
        },
      },
    },
  });
}
