import { AdminGate } from "@/components/goo/AdminGate";
import { GooMatchLab } from "@/components/goo/GooMatchLab";

export default function AdminMatchLabPage() {
  return (
    <AdminGate>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <GooMatchLab />
      </div>
    </AdminGate>
  );
}
