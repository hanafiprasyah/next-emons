// This method will return all value of Voltage

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

  try {
    const response = await fetch(
      `http://45.13.132.175:8802/device/getdatavoltage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://45.13.132.175/",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Origin, X-Requested-With",
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
        res.status(401).json({ message: "Status: " + response.status });
      }
      throw new Error("Service Unavailable");
    }

    const data = await response.json();

    res.status(200).json({ message: response.statusText, voltage: data });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}
