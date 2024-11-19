"use server";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { password, tenant } = req.query;

  try {
    const response = await fetch(
      `${process.env.BASE_URL}:${process.env.USER_PORT}/Usermanagement/encript?strdata=${password}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Authorize, tenant, token",
          "Cache-Control":
            "s-maxage=10, max-age=0, no-store, no-cache, must-revalidate",
          tenant: tenant,
          Authorize: process.env.AUTH_CODE,
          token: process.env.AUTH_TOKEN,
        },
      }
    );

    if (!response.ok) {
      res.status(response.status).json({ message: "Failed to connect" });
    }

    const data = await response.json();

    if (data) {
      res
        .status(response.status)
        .json({ message: "Encrypted successfully", passdata: data });
    } else {
      res
        .status(response.status)
        .json({ message: "Encrypted failed", passdata: null });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
}
