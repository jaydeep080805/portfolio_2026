// regex func to check if an email is in a valid format
export const checkEmailValid = (email) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};
