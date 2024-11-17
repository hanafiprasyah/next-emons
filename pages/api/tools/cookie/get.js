"use server";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
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

    // Check if cookies are present
    const hasCookies = !!(currentToken && currentSalt);

    res
      .status(200)
      .json({ token: currentToken, salt: currentSalt, hasCookie: hasCookies });
  } catch (err) {
    res.status(500).json({ token: null, salt: null, hasCookie: false });
  }
}
