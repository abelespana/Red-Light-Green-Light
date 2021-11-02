export const validateUsername = username => {
  let isValid = false;
  if (username.trim().length >= 6) {
    isValid = true;
  }
  return isValid;
};
