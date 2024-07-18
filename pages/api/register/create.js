export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = JSON.parse(req.body);

  try {
    const response = await fetch(
      "http://45.13.132.175:8801/Usermanagement/adduser",
      {
        method: "POST",
        headers: {
          tenant: "alif",
          token: "jwatdata",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
}
