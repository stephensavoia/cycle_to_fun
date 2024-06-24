export async function validate(email: string, password: string) {
  let errors: { email?: string; password?: string } = {};

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
    default:
      break;
  }

  return Object.keys(errors).length ? errors : null;
}
