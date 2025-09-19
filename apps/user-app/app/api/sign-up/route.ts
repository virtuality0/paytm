import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";
import bcrypt from "bcrypt";
import createError from "http-errors";

export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json();

  try {
    // For OAuth signups, password will be undefined. We upsert by email.
    const newUser = await db.user.upsert({
      where: { email },
      update: { name },
      create: {
        email,
        name,
        // If password provided (non-OAuth), hash and store; else leave null
        password: password ? await bcrypt.hash(password, 10) : null,
      },
    });

    // Ensure Balance exists for this user (id is unique in Balance.userId)
    await db.balance.upsert({
      where: { userId: newUser.id },
      update: {},
      create: { userId: newUser.id, amount: 0, locked: 0 },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User upserted successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    if (createError.isHttpError(err)) {
      return NextResponse.json(
        {
          success: false,
          message: err.message,
          stackTrack: err.stack,
        },
        { status: err.status },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error!",
        },
        { status: 500 },
      );
    }
  }
}
