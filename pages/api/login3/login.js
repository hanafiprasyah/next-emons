"use server";

import { NextResponse, NextRequest } from "next/server";
import { encryptCookies } from "@/lib/helper/cookie-encryption";

async function handler(req, res) {
  if (req.method !== "POST") {
    if (process.env.NODE_ENV === "development") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    throw new Error("Error 405");
  }

  const { tenant, userName, password, salt } = JSON.parse(req.body);
  if (!tenant || !userName || !password || !salt) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const secretKey = process.env.CRYPT_SECRET;
  const encryptedCookieString = encryptCookies(tenant, secretKey);
  // const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour from now
  // const expiresAtUTC = expiresAt.toUTCString();
  const secureFlag = process.env.NODE_ENV === "production" ? "Secure" : "";

  try {
    const response = await fetch(
      `${process.env.BASE_URL}:${process.env.USER_PORT}/Usermanagement/loginv1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Origin, X-Requested-With",
          "Cache-Control": "s-maxage=10",
          "Content-Security-Policy":
            "default-src 'self'; script-src 'self'; object-src 'none';",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "X-XSS-Protection": "1; mode=block",
          "X-API-Version": "1.0.0",
          tenant: tenant,
          token: process.env.AUTH_TOKEN,
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
          salt: salt,
        }),
      }
    );

    if (!response.ok) {
      if (process.env.NODE_ENV === "development") {
        res
          .status(response.status)
          .json({ message: "Status: " + response.status });
      }
      throw new Error("Service Unavailable");
    }

    res.setHeader(
      "Set-Cookie",
      `enc-header-site=${encryptedCookieString}; Path=/; HttpOnly; SameSite=Lax; ${secureFlag}; Max-Age=3600`
    );

    const data = await response.json();
    res
      .status(response.status)
      .json({ message: "Login successfully", datalogin: data });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error(e);
    }
    res.status(500).json({ error: "Internal server error" });
  }
}

export default handler;
