"use server";

import { NextResponse, NextRequest } from "next/server";
import { encryptCookies } from "@/lib/helper/cookie-encryption";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    if (process.env.NODE_ENV === "development") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    throw new Error("Error 405");
  }

  const { tenant, userName, password, salt } = JSON.parse(req.body);
  const oneDay = 24 * 60 * 60 * 1000;
  // const auth = req.cookies.authorization;
  const secretKey = process.env.CRYPT_SECRET;
  const encryptedCookieString = encryptCookies(tenant, secretKey);

  try {
    const response = await fetch(
      "http://45.13.132.175:8801/Usermanagement/loginv1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://45.13.132.175/",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Origin, X-Requested-With",
          "Cache-Control": "s-maxage=10",
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
    } else {
      res.setHeader(
        "Set-Cookie",
        `tenant=${encryptedCookieString}; Path=/; HttpOnly; Secure=${
          process.env.NODE_ENV === "production"
        }; Expires=${Date.now - oneDay}`
      );

      const data = await response.json();
      res
        .status(response.status)
        .json({ message: "Login successfully", datalogin: data });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}
