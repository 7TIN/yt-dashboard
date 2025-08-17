"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

// 1. Define the type for the comment object
interface YouTubeComment {
  id: string;
  snippet: {
    topLevelComment: {
      snippet: {
        authorDisplayName: string;
        textDisplay: string;
      };
    };
  };
}


export default function CommentSection({
  videoId,
  accessToken,
}: {
  videoId: string;
  accessToken: string;
}) {
  // 2. Use the new type for your state
  const [comments, setComments] = useState<YouTubeComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    const response = await fetch(
      `/api/youtube/comments?videoId=${videoId}`
    );
    const data = await response.json();
    setComments(data.items);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const handlePostComment = async () => {
    setPosting(true);
    await fetch("/api/youtube/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoId, text: newComment, accessToken }),
    });
    setNewComment("");
    setPosting(false);
    fetchComments();
  };

  const handleDeleteComment = async (commentId: string) => {
    await fetch(`/api/youtube/comment?commentId=${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    fetchComments();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <Button onClick={handlePostComment} disabled={posting} className="mt-2">
              {posting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post Comment
            </Button>
          </div>
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <div className="space-y-4">
              {/* This map function will now be fully type-safe */}
              {comments?.map((comment) => (
                <div key={comment.id} className="border-t pt-4">
                  <p className="font-semibold">
                    {comment.snippet.topLevelComment.snippet.authorDisplayName}
                  </p>
                  <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                   <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}