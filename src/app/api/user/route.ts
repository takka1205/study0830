import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (req: Request, res: NextResponse) => {
  const { title, email } = await req.json();
  try {
    const users = await prisma.user.create({ data: { title, email } });
    return NextResponse.json({ message: "成功", users }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "失敗", err }, { status: 500 });
  }
};
