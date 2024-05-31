import Image from "next/image";
import ComingSoon from "@/components/comingSoon";
import Meta from "@/components/generic/Meta";
import META from "@/helper/meta-constant";
import { CodeVivaLogo } from "@/components/generic/Icons";
export default function Home() {
  return (
    <>
      <Meta
        title={META.home.title}
        img={CodeVivaLogo}
        imgDescription={META.home.description}
        canonicaUrl={process.env.NEXT_PUBLIC_BASE_URL}
        description={META.home.description}
      />
      <div className="h-screen">
        <ComingSoon />

        <Image src={CodeVivaLogo} alt="fsdf" />
      </div>
    </>
  );
}
