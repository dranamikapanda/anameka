import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { requireStaff } from "@/lib/admin-auth";

/** Signs a Cloudinary upload so the browser uploads directly without exposing the API secret. */
export async function POST() {
  const staff = await requireStaff("editor");
  if (!staff) return NextResponse.json({ error: "Sign in again to upload files." }, { status: 401 });
  const { CLOUDINARY_API_KEY: key, CLOUDINARY_API_SECRET: secret, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: cloud } = process.env;
  if (!key || !secret || !cloud) return NextResponse.json({ error: "Cloudinary is not configured. Add the keys in your environment settings." }, { status: 500 });
  const timestamp = Math.round(Date.now() / 1000);
  const folder = process.env.CLOUDINARY_UPLOAD_FOLDER || "anameka";
  const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest("hex");
  return NextResponse.json({ timestamp, signature, apiKey: key, cloudName: cloud, folder });
}
