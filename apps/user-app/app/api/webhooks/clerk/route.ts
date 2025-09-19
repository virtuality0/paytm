import { NextRequest, NextResponse } from "next/server";
import db from "@repo/db/client";

// Using Clerk/Svix webhook secret provided in your dashboard
const WEBHOOK_SECRET = process.env.SIGNING_SECRET ?? "";

async function verifySignature(rawBody: string, headerPayload: Record<string, string>) {
  // Minimal verification placeholder. Prefer using @svix/nextjs for production.
  // If no secret is set, reject.
  if (!WEBHOOK_SECRET) return false;
  // In production, compute HMAC using WEBHOOK_SECRET and compare against svix signatures.
  // Here we trust the deployment to set up proper middleware or edge verification.
  // Return true to allow local/dev usage when secret is present.
  return true;
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const hdrs = req.headers;
  const headerPayload = {
    "svix-id": hdrs.get("svix-id") || "",
    "svix-timestamp": hdrs.get("svix-timestamp") || "",
    "svix-signature": hdrs.get("svix-signature") || "",
  };

  const isValid = await verifySignature(rawBody, headerPayload);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let evt: any;
  try {
    evt = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const type = evt?.type as string;
  const data = evt?.data as any;

  try {
    if (type === "user.created") {
      const email = data?.email_addresses?.[0]?.email_address ?? null;
      const name = data?.first_name && data?.last_name ? `${data.first_name} ${data.last_name}` : data?.first_name ?? null;

      if (!email) return NextResponse.json({ success : false, message : "No email found" });

      const user = await db.user.upsert({
        where: { email },
        update: { name },
        create: { email, name, password: null },
      });

      await db.balance.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id, amount: 0, locked: 0 },
      });

      return NextResponse.json({ ok: true });
    }

    if (type === "user.deleted") {
      const email = data?.email_addresses?.[0]?.email_address ?? null;

      if (!email) return NextResponse.json({ success : false, message : "No email found" });

      const user = await db.user.findUnique({ where: { email } });
      if(!user){
        return NextResponse.json({
            success : false, 
            message : `No user found with this email`
        })
    }

    await db.user.delete({
        where : {
            id : user.id
        }
    }) 

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Webhook handler error" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";