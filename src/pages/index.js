import ComingSoon from "@/components/comingSoon";
import Meta from "@/components/generic/Meta";
import META from "@/helper/meta-constant";

export default function Home() {
  return (
    <>
      <Meta title={META.home.title} description={META.home.description} />
      <div className="h-screen">
        <ComingSoon />
      </div>
    </>
  );
}
