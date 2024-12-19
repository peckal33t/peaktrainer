import { Table } from "@/components/ui/table";
import Link from "next/link";

const AdminPage = () => {
  return (
    <div className="mx-auto flex flex-col max-w-7xl space-y-4 py-5">
      <div className="admin-header">
        <Link href="/">
          <h1 className="text-2xl">
            Peak<span className="text-orange-500">Trainer</span>
          </h1>
        </Link>
        <p>Admin</p>
      </div>

      <section className="admin-main">
        <div className="w-full space-y-4">
          <h1 className="text-xl">Admin Dashboard</h1>
        </div>

        <Table />
      </section>
    </div>
  );
};

export default AdminPage;
