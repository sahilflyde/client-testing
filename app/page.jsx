import dynamic from "next/dynamic";
import pageData from "../data/pages/home.json";

const RenderBlock = dynamic(() => import("../components/RenderBlock"), {
  ssr: false,
});

export default function Page() {
  return (
    <main>
      {pageData.components?.map((b, i) => (
        <RenderBlock key={i} block={b} />
      ))}
    </main>
  );
}