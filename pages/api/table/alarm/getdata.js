"use server";

// Utility function to parse date strings to Date objects
const parseDate = (dateString) => {
  return new Date(dateString);
};

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

  // Pagination query
  const page = parseInt(req.query.page || "1", 10);
  const limit = parseInt(req.query.limit || "10", 10);

  try {
    const response = await fetch(
      `${process.env.BASE_URL}:${process.env.GENERAL_PORT}/device/getdataalarm`,
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
          Authorize: currentSalt,
          token: currentToken,
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

    res.status(200).json({
      message: "Success",
      data: paginatedData,
      total: limitedData.length,
    });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
}
