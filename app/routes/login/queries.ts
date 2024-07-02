import crypto from "node:crypto";

export async function login(env: Env, email: string, password: string) {
  // get user and haspass and salt for the user
  let { results } = await env.DB.prepare(
    "SELECT UserID, Salt, PasswordHash FROM users WHERE Email = ?;"
  )
    .bind(email)
    .all();

  let user = results[0];

  if (!user.UserID || !user.PasswordHash || !user.Salt) return null;

  // compare the password with the hashpass and salt

  let hash = crypto
    .pbkdf2Sync(password, user.Salt as string, 1000, 64, "sha256")
    .toString("hex");

  if (hash === user.PasswordHash) {
    return String(user.UserID);
  }

  return null;
}
