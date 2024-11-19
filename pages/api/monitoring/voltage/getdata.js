"use server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
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

  const cookies = req.headers.cookie
    ? Object.fromEntries(
        req.headers.cookie.split("; ").map((c) => {
          const [name, ...rest] = c.split("="); // Split only on the first `=`
          return [name, rest.join("=")]; // Rejoin the rest to preserve `=` in the value
        })
      )
    : {};

  const currentToken = cookies["enc-header-token"];
  const currentSalt = cookies["enc-header-salt"];

  try {
    const response = await fetch(
      `${process.env.BASE_URL}:${process.env.GENERAL_PORT}/device/getlastdatavoltage`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Authorize, tenant, token",
          tenant: tenant,
          token: currentToken,
          Authorize: currentSalt,
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
      if (response.status === 401) {
        return res.status(401).json({
          message: "Unauthorized: Check token and salt values",
          salt: currentSalt,
          token: currentToken,
        });
      } else {
        res.status(response.status).json({
          message: "Failed to connect",
        });
      }
    }

    const data = await response.json();

    res.status(200).json({ message: "Success", voltage: data });
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
