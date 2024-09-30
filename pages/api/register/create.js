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

  try {
    const response = await fetch(
      `${process.env.BASE_URL}:${process.env.USER_PORT}/Usermanagement/adduser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.BASE_URL}/`,
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers":
            "Content-Type, Accept, Origin, X-Requested-With",
          tenant: tenant,
          token: process.env.AUTH_TOKEN,
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

    res.status(201).json({
      message: "New user named " + nama + " has been created successfully",
    });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.error(e);
    }
    res.status(500).json({ error: "Internal server error" });
  }
}
