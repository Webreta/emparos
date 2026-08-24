import { sectors } from "@/lib/sectors";
import { SectorHome } from "@/components/sector/SectorPages";

export default function Page() {
  return <SectorHome sector={sectors.muhendislik} />;
}
