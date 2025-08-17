import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import VideoDetails from "@/components/VideoDetails";
import CommentSection from "@/components/CommentSection";
import NotesSection from "@/components/NotesSection";
import VideoPlayer from "@/components/VideoPlayer";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please sign in to view the dashboard.</div>;
  }

  const videoId = process.env.YOUTUBE_VIDEO_ID as string;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">YouTube Companion Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <VideoPlayer videoId={videoId} />
          <VideoDetails videoId={videoId} accessToken={session.accessToken as string} />
          <CommentSection videoId={videoId} accessToken={session.accessToken as string} />
        </div>
        <div className="md:col-span-1">
          <NotesSection />
        </div>
      </div>
    </div>
  );
}