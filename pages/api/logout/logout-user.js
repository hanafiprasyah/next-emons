"use server";

import { NextRequest, NextResponse } from "next/server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    res.setHeader(
      "Set-Cookie",
      "tenant=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0"
    );
    res.status(200).json({ message: "User signed out successfully" });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error(e);
    }
    res.status(500).json({ error: "Internal server error" });
  }
}
