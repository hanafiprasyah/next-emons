"use server";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, tenant } = req.query;

  try {
    const response = await fetch(
      `${process.env.BASE_URL}:${process.env.USER_PORT}/Usermanagement/encriptv1?strdata=${username}`,
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
        .json({ message: "Salt successfully", datas: data });
    } else {
      res
        .status(response.status)
        .json({ message: "Failed to seed", datas: null });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
}
