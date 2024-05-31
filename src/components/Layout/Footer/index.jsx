import React from "react";
import { CodeVivaSq } from "@/components/generic/Icons";

const Footer = () => {
  let date = new Date();
  return (
    <div className="py-2 px-4 text-center  font-jost bg-purple-100">
      <div>
        <div className=" flex items-center justify-center w-full ">
          <div className="px-2">
            <CodeVivaSq size='30' />
          </div>

          <span className="hidden md:flex  font-normal">
            © {date.getFullYear()} All right reserved - CodeViva
          </span>
          <span className="flex flex-col items-center md:hidden  text-sm space-y-2 font-normal">
            <span className="text-xs">
              © {date.getFullYear()} All right reserved - CodeViva
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
