"use server";

import { NextResponse, NextRequest } from "next/server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    if (process.env.NODE_ENV === "development") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    throw new Error("Error 405");
  }

  const {
    locationid,
    lane,
    status,
    value,
    side,
    start_trancation_date,
    end_trancation_date,
    tenant,
  } = req.body;

  const { page = 1, limit = 10 } = req.query;

  try {
    const response = await fetch(
      `${process.env.BASE_URL}:${process.env.GENERAL_PORT}/device/getdataalarm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": process.env.BASE_URL,
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Origin, X-Requested-With",
          "Cache-Control": "s-maxage=3600, max-age=3600",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "SAMEORIGIN",
          "Strict-Transport-Security":
            "max-age=31536000; includeSubDomains; preload",
          "X-XSS-Protection": "1; mode=block",
          "X-API-Version": "1.0.0",
          tenant: tenant,
          token: process.env.AUTH_TOKEN,
        },
        body: JSON.stringify({
          locationid: locationid,
          lane: lane,
          status: status,
          value: value,
          side: side,
          start_trancation_date: start_trancation_date,
          end_trancation_date: end_trancation_date,
          tenant: tenant,
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

    const result = await response.json();

    res
      .status(200)
      .json({ message: response.statusText, voltage: result.data });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error(e);
    }
    res.status(500).json({ error: "Internal server error" });
  }
}
