"use server";

import { NextResponse, NextRequest } from "next/server";

// Utility function to parse date strings to Date objects
const parseDate = (dateString) => {
  return new Date(dateString);
};

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

  const page = parseInt(req.query.page || "1", 10);
  const limit = parseInt(req.query.limit || "10", 10);

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
          start_trancation_date: "",
          end_trancation_date: "",
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
    const data = result.data || [];

    // // Filtering data before set pagination
    // const filteredData = data.filter((item) => {
    //   const sendDate = parseDate(item.send_date);
    //   const startDate = parseDate(start_trancation_date);
    //   const endDate = parseDate(end_trancation_date);
    //   // only return the datas if sendDate is between startDate and endDate
    //   return sendDate >= startDate && sendDate <= endDate;
    // });

    // Sort by send_date in desc order (newest first)
    const sortedData = data.sort(
      (a, b) => parseDate(b.send_date) - parseDate(a.send_date)
    );
    // Limit to the latest 1000 data
    const limitedData = sortedData.slice(0, 1000);

    // Pagination logic
    const start = (page - 1) * limit;
    const end = start + limit;
    // const paginatedData = filteredData.slice(start, end);
    const paginatedData = limitedData.slice(start, end);

    res.status(200).json({ data: paginatedData, total: limitedData.length });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error(e);
    }
    res.status(500).json({ error: "Internal server error" });
  }
}
