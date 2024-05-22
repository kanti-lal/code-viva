// export const isLoggedIn = () => {
//   return (localStorage.getItem('user' === null)) ? false : true
// };

export const isLoggedIn = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user") === null ? false : true;
  }
  return false;
};

export const isBrowser = () => {
  return typeof window !== "undefined";
};

export const nextLocalStorage = () => {
  if (isBrowser()) {
    return window.localStorage;
  }
  return null;
};
