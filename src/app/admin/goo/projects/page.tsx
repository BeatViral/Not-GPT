import { AdminGate } from "@/components/goo/AdminGate";
import { AdminProjectEditor } from "@/components/goo/AdminProjectEditor";
import { listPublishedProjects } from "@/services/goo/registry";

export default function AdminProjectsPage() {
  return (
    <AdminGate>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <AdminProjectEditor projects={listPublishedProjects()} />
      </div>
    </AdminGate>
  );
}
