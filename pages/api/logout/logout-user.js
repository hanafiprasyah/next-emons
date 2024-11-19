"use server";

import { NextRequest, NextResponse } from "next/server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secureFlag = process.env.NODE_ENV === "production" ? "Secure" : "";
  const siteType = process.env.NODE_ENV === "production" ? "None" : "Lax";

  try {
    res.setHeader("Set-Cookie", [
      `enc-header-salt=; Path=/; HttpOnly; ${secureFlag}; SameSite=${siteType}; Max-Age=0`,
      `enc-header-token=; Path=/; HttpOnly; ${secureFlag}; SameSite=${siteType}; Max-Age=0`,
    ]);
    res.status(200).json({ message: "User signed out successfully" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
}
