import { columns, Payment } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getAppointments } from "@/lib/service/client";
import Link from "next/link";

const getData: () => Promise<Payment[]> = async () => {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
};

const AdminPage = async () => {
  const data = await getData();
  const appointments = await getAppointments();

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

        {/* <DataTable data={appointments.documents} columns={columns} /> */}
        <DataTable data={data} columns={columns} />
      </section>
    </div>
  );
};

export default AdminPage;
