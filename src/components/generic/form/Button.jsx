import React from "react";
import SpinnerLoader from "../SpinnerLoader";

export const BUTTON_CLASSES = {
  base: "font-jost font-medium text-xs sm:text-sm leading-6 tracking-[1.7px] text-white uppercase px-3 sm:px-5 md:px-6 py-[9px] text-center  focus:shadow-none ease-in-out duration-300",
  default: "text-white bg-grey-900 hover:bg-secondary-100",
  bordered:
    "!text-grey-900 bg-transparent border border-grey-900 hover:!text-white",
  white:
    "!text-grey-900 border !bg-grey-100 hover:bg-grey-900 hover:border-grey-100 hover:!text-grey-900",
  disabled: "disabled:bg-grey-400 ",
};

const Button = ({
  title,
  white,
  border,
  fullWidth,
  icon,
  center,
  disabled,
  className,
  btnLoader,
  onClick,
  ...rest
}) => {
  const defaultStyle = !white ? BUTTON_CLASSES.default : "";

  const borderClass = border ? BUTTON_CLASSES.bordered : "";

  const whiteClass = white ? BUTTON_CLASSES.white : "";

  const disableClass = disabled ? BUTTON_CLASSES.disabled : "";

  const iconClass = icon ? "flex items-center gap-1 sm:gap-2" : "";
  const width = fullWidth ? "w-full" : "";
  const buttonCenter = center ? "justify-center" : "";
  const btnLoaderClass = btnLoader
    ? "flex items-center justify-center gap-2"
    : "";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${BUTTON_CLASSES.base} ${disableClass} ${defaultStyle} ${borderClass} ${whiteClass} ${iconClass} ${buttonCenter} ${width} ${className} ${btnLoaderClass}`}
      {...rest}
    >
      {btnLoader && <SpinnerLoader size="4" white />}
      {icon && icon} {title}
    </button>
  );
};

export default Button;
