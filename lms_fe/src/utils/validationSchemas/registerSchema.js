export const registerSchema = (user) => {
  const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const newError = {};

  if (!usernamePattern.test(user.userName)) {
    newError.userName = "User name is invalid.";
  }

  if (!user.fullName) {
    newError.fullName = "Full name is not blank.";
  }

  if (!passwordPattern.test(user.password)) {
    newError.password =
      "Password is invalid: at least 8 characters, including letters and numbers.";
  }

  if (user.password !== user.confirmPassword) {
    newError.confirmPassword = "Password not match.";
  }

  return newError;
};
// Sử dụng JS
// react hook form
// Formik + Yup