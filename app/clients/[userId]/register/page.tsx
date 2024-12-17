import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/service/client";
import Link from "next/link";

const RegisterPage = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

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

      <section className="container my-auto remove-scrollbar">
        <div className="max-w-[496px] sub-container">
          <Link href="/">
            <h1 className="text-2xl">
              Peak<span className="text-orange-500">Trainer</span>
            </h1>
          </Link>
        </div>

        <RegisterForm user={user} />

        <div className="max-w-[496px] sub-container text-14-regular">
          <p className="text-dark-600 xl:text-left">
            © 2024 PeakTrainer, All Rights Reserved
          </p>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
