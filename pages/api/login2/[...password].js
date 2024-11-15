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
          "Content-Type": "application/json",
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
