import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authoptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authoptions);
  if (!session) {
    return NextResponse.json({ error: "Not Authenticated" }, { status: 401 });
  }
  const { title, desc, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();
  const authorEmail = session?.user?.email as string;
  if (!title || !content) {
    return NextResponse.json(
      { error: "Please fill the required fields" },
      { status: 500 }
    );
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        desc,
        content,
        links,
        catName: selectedCategory,
        imageUrl,
        publicId,
        authorEmail,
      },
    });
    return NextResponse.json(newPost);
  } catch (err) {
    return NextResponse.json({ message: "Couldn't create post." });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { email: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (err) {
    console.log("Erro  =====>r", err);
    return (
      NextResponse.json({ message: "Couldn't get post." }), { status: 500 }
    );
  }
}
