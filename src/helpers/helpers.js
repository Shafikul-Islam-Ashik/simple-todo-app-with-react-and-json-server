import { toast } from "react-toastify";

/**
 * create toast message
 * @param {*} msg
 * @param {*} type
 * @returns
 */
export const createToast = (msg, type = "error") => {
  return toast[type](msg);
};

/**
 * Phone validation
 * @param {*} mobile
 * @returns
 */
export const isValidMobile = (mobile) => {
  // Regular expression for mobile number validation
  return /^(01|8801|\+8801)[0-9]{9}$/.test(mobile);
};

/**
 * Email validation
 * @param {*} email
 * @returns
 */
export const isValidEmail = (email) => {
  // Regular expression for a more comprehensive email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return emailRegex.test(email);
};
