"use server";

import { NextResponse, NextRequest } from "next/server";
import { encryptCookies } from "@/lib/helper/cookie-encryption";
import rateLimitMiddleware from "../../utils/rateLimit";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const secureFlag = process.env.NODE_ENV === "production" ? "Secure" : "";
  const siteType = process.env.NODE_ENV === "production" ? "Strict" : "Lax";

  const { tenant, userName, password, salt } = JSON.parse(req.body);

  try {
    const response = await fetch(
      `${process.env.BASE_URL}:${process.env.USER_PORT}/Usermanagement/loginv1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "s-maxage=10, max-age=0, no-store, no-cache, must-revalidate",
          tenant: tenant,
          Authorize: process.env.AUTH_CODE,
          token: process.env.AUTH_TOKEN,
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
          email: "",
          emailConfirmed: "OK",
          passwordConfirmed: "1",
          tenant: tenant,
          type: "1",
          salt: salt,
        }),
      }
    );

    if (!response.ok) {
      res.status(response.status).json({ message: "Failed to connect" });
    }

    const data = await response.json();

    if (data) {
      try {
        await res.setHeader("Set-Cookie", [
          `enc-header-token=${data.tokenheader}; HttpOnly; ${secureFlag}; SameSite=${siteType}; Path=/; Max-Age=3600`,
          `enc-header-salt=${data.saltheader}; HttpOnly; ${secureFlag}; SameSite=${siteType}; Path=/; Max-Age=3600`,
        ]);
        res.status(response.status).json({
          message: "Login successfully",
          datalogin: data,
          cookie_token: data.tokenheader,
          cookie_salt: data.saltheader,
        });
      } catch (error) {
        // Handle the error as needed
        res
          .status(500)
          .json({ message: "Error setting cookie", datalogin: null });
      }
    } else {
      res
        .status(response.status)
        .json({ message: "Login failed", datalogin: null });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export default rateLimitMiddleware(handler);
