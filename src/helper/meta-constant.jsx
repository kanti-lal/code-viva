import { BRAND_NAME } from "./constants";

const COMMON__META_CONTENT = {
  description:
    BRAND_NAME +
    "Welcome to CodeViva! We're your partner in preparing for interviews and advancing your career. Our platform offers a wealth of resources, including objective questions, practical solutions, assignment tasks, and machine interview questions. We're here to guide you on your career path, helping you express your potential and build a better future. We also provide opportunities for freshers and internships in frontend and backend development. Join us on this journey of learning and growth!",
  keywords:
    BRAND_NAME +
    "Welcome to CodeViva! We're your partner in preparing for interviews and advancing your career. Our platform offers a wealth of resources, including objective questions, practical solutions, assignment tasks, and machine interview questions. We're here to guide you on your career path, helping you express your potential and build a better future. We also provide opportunities for freshers and internships in frontend and backend development. Join us on this journey of learning and growth!",
};

const META = {
  home: {
    title: "Home | " + BRAND_NAME,
    description: COMMON__META_CONTENT.description,
    keywords: COMMON__META_CONTENT.keywords,
  },
  signIn: {
    title: "Sign-In | " + BRAND_NAME,
    description: COMMON__META_CONTENT.description,
  },
  forgotPassword: {
    title: "Forgot-Password | " + BRAND_NAME,
    description: COMMON__META_CONTENT.description,
  },
  resetPassword: {
    title: "Reset-Password | " + BRAND_NAME,
    description: COMMON__META_CONTENT.description,
  },
  signUp: {
    title: "Sign-Up | " + BRAND_NAME,
    description: COMMON__META_CONTENT.description,
  },

  contactUs: {
    title: "Contact Us | " + BRAND_NAME,
    description: COMMON__META_CONTENT.description,
  },
  thankYou: {
    title: "Thank  | " + BRAND_NAME,
    description: COMMON__META_CONTENT.description,
  },

  profile: {
    title: "Profile  | " + BRAND_NAME,
    description: COMMON__META_CONTENT.description,
  },
  wishlist: {
    title: "Wishlist  | " + BRAND_NAME,
    description: COMMON__META_CONTENT.description,
  },

  careers: {
    title: "Careers  | " + BRAND_NAME,
    description: COMMON__META_CONTENT.description,
    keywords: COMMON__META_CONTENT.keywords,
  },

  paymentFailed: {
    title: "Payment Failed | " + BRAND_NAME,
    description: COMMON__META_CONTENT.description,
  },
  underMaintenance: {
    title: "Under Maintenance | " + BRAND_NAME,
    description: COMMON__META_CONTENT.description,
  },
};

export default META;
