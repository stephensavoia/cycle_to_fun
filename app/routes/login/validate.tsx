// import { accountExists } from "./queries";

export async function validate(
  username: string,
  email: string,
  password: string
) {
  let errors: { username?: string; email?: string; password?: string } = {};

  switch (true) {
    case !username:
      errors.username = "Username is required.";
      break;
    case username.length < 5:
      errors.username = "Username must be at least 5 characters.";
      break;
    case !/^[a-zA-Z0-9]+$/.test(username):
      errors.username = "Username can only contain alphanumeric characters.";
      break;
    default:
      break;
  }

  switch (true) {
    case !email:
      errors.email = "Email is required.";
      break;
    case !email.includes("@"):
      errors.email = "Please enter a valid email address.";
      break;
    default:
      break;
  }

  switch (true) {
    case !password:
      errors.password = "Password is required.";
      break;
    case password.length < 8:
      errors.password = "Password must be at least 8 characters.";
      break;
    case !/\d/.test(password):
      errors.password = "Password must contain at least one digit.";
      break;
    case !/[a-z]/.test(password):
      errors.password = "Password must contain at least one lowercase letter.";
      break;
    case !/[A-Z]/.test(password):
      errors.password = "Password must contain at least one uppercase letter.";
      break;
    default:
      break;
  }

  //   if (!errors.email && (await accountExists(email))) {
  //     errors.email = "An account with this email already exists.";
  //   }

  return Object.keys(errors).length ? errors : null;
}
