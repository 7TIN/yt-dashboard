import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { videoId, content, tags } = await req.json();

  const note = await prisma.note.create({
    data: {
      userEmail: session.user.email,
      videoId,
      content,
      tags,
    },
  });

  return NextResponse.json(note);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");

  const notes = await prisma.note.findMany({
    where: { videoId: videoId ?? undefined },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(notes);
}
