// This method will return a Salt and encrypted username

export default async function handler(req, res) {
  if (req.method !== "GET") {
    if (process.env.NODE_ENV === "development") {
      return res.status(405).json({ error: "Method not allowed" });
    }
    throw new Error("Error 405");
  }

  const { username, tenant } = req.query;

  try {
    const response = await fetch(
      `http://45.13.132.175:8801/Usermanagement/encriptv1?strdata=${username}`,
      {
        method: "GET",
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
      .json({ message: "Salt successfully", datas: data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}
