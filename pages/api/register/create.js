"use server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    tenant,
    nama,
    username,
    password,
    level_report,
    regional,
    wiker,
    status,
    ipaddress,
    nip,
    createdby,
    phone,
    email,
    gender,
    employetype,
  } = JSON.parse(req.body);

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
      `${process.env.BASE_URL}:${process.env.USER_PORT}/Usermanagement/adduser`,
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
          nama: nama,
          username: username,
          password: password,
          level_report: level_report,
          regional: regional,
          wiker: wiker,
          status: status,
          ipaddress: ipaddress,
          nip: nip,
          createdby: createdby,
          phone: phone,
          email: email,
          gender: gender,
          employetype: employetype,
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

    res.status(201).json({
      message: "New user named " + nama + " has been created successfully",
    });
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
}
