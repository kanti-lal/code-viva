import MenuBar from "@/components/Layout/Header/Menubar";
import { Button } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className=''
    >
     <MenuBar />

    </main>
  );
}
