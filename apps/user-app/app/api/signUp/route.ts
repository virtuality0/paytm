import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";
import bcrypt from "bcrypt";
import createError from "http-errors";

export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json();

  try {
    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw createError.Conflict(
        "This email is associated with another account.",
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User signed up successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    if (createError.isHttpError(err)) {
      NextResponse.json(
        {
          success: false,
          message: err.message,
          stackTrack: err.stack,
        },
        { status: err.status },
      );
    } else {
      NextResponse.json(
        {
          success: false,
          message: "Internal Server Error!",
        },
        { status: 500 },
      );
    }
  }
}
