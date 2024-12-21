import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getAppointments } from "@/lib/service/client";
import Link from "next/link";

const AdminPage = async () => {
  const appointments = await getAppointments();

  return (
    <div className="mx-auto flex flex-col max-w-7xl space-y-10 py-5">
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
          <p className="text-dark-700">
            Easily oversee and update appointment schedules
          </p>
        </div>

        <DataTable data={appointments.documents} columns={columns} />
      </section>
    </div>
  );
};

export default AdminPage;
