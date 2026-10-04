import { shareMetadata } from "../../../lib/shareMeta";
import OpenSharedMap from "../../../components/OpenSharedMap";

// Short share links: /p/CODE.
// Facebook, WhatsApp and X read this page's tags (they don't run JavaScript),
// so they show a picture of the person's own map. Real visitors are sent
// straight to the map at /?s=CODE.
export const dynamic = "force-dynamic";

export function generateMetadata({ params }) {
  const code = decodeURIComponent(params.code || "");
  return (
    shareMetadata(code, `/p/${encodeURIComponent(code)}`) || {
      title: "Shared map",
      robots: { index: false, follow: true },
      alternates: { canonical: "/" },
    }
  );
}

export default function SharedMapPage({ params }) {
  return <OpenSharedMap code={decodeURIComponent(params.code || "")} />;
}
