import ClientForm from "@/components/forms/ClientForm";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex h-screen max-h-screen">
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

      <section className="container my-auto">
        <div className="max-w-[496px] sub-container space-y-8">
          <Link href="/">
            <h1 className="text-xl">
              Peak<span className="text-orange-500">Trainer</span>
            </h1>
          </Link>
          <ClientForm />
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
