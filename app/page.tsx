import ClientForm from "@/components/forms/ClientForm";
import Skeleton from "@/components/Skeleton";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const admin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {admin && <Skeleton />}

      <nav className="absolute top-7 right-24 flex space-x-6">
        <Link href="/login" className="text-sm font-medium text-white">
          Login
        </Link>
        <Link
          href="/?admin=true"
          className="text-sm font-medium text-orange-600"
        >
          Admin
        </Link>
      </nav>

      <section className="container my-auto remove-scrollbar">
        <div className="max-w-[496px] sub-container">
          <Link href="/">
            <h1 className="text-2xl">
              Peak<span className="text-orange-500">Trainer</span>
            </h1>
          </Link>
        </div>

        <div className="max-w-[496px] sub-container">
          <p>
            Take charge of your training business with PeakTrainer. This
            all-in-one app streamlines scheduling, client tracking, and session
            management, helping you stay organized and focus on your success.
          </p>
          <br />
          <ClientForm />
        </div>

        <div className="max-w-[496px] sub-container text-14-regular">
          <p className="text-dark-600 xl:text-left">
            © 2024 PeakTrainer, All Rights Reserved
          </p>
        </div>
      </section>
    </div>
  );
}
