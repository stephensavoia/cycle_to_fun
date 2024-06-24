import crypto from "crypto";

export async function accountExists(env: Env, email: string) {
  let { results } = await env.DB.prepare(
    "SELECT UserId FROM users WHERE email = ?;"
  )
    .bind(email)
    .all();
  return Boolean(results.length > 0);
}

export async function createAccount(
  env: Env,
  username: string,
  email: string,
  password: string
) {
  let salt = crypto.randomBytes(16).toString("hex");
  let hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha256")
    .toString("hex");

  let { success } = await env.DB.prepare(
    "INSERT INTO users (Username, Email, Salt, PasswordHash) VALUES (?, ?, ?, ?);"
  )
    .bind(username, email, salt, hash)
    .run();

  if (success) {
    let userId = await env.DB.prepare(
      "SELECT UserId FROM users WHERE email = ?;"
    )
      .bind(email)
      .first("UserID");
    return String(userId);
  } else {
    return null;
  }
}
