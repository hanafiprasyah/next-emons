"use server";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    if (process.env.NODE_ENV === "development") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    throw new Error("Error 405");
  }

  const { password, tenant } = req.query;

  try {
    const response = await fetch(
      `${process.env.BASE_URL}:${process.env.USER_PORT}/Usermanagement/encript?strdata=${password}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Origin, X-Requested-With",
          "Cache-Control": "s-maxage=10",
          tenant: tenant,
          token: process.env.AUTH_TOKEN,
        },
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

    const data = await response.json();

    res
      .status(response.status)
      .json({ message: "Encrypted successfully", passdata: data });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error(e);
    }
    res.status(500).json({ error: "Internal server error" });
  }
}
