import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
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
          <h1 className="text-xl">
            Peak<span className="text-orange-500">Trainer</span>
          </h1>
        </div>

        <div className="max-w-[496px] sub-container">
          <p>
            Take charge of your training business with PeakTrainer. This
            all-in-one app streamlines scheduling, client tracking, and session
            management, helping you stay organized and focus on your success.
          </p>
          <Link href="/register">
            <Button className="bg-orange-600 text-white hover:bg-orange-500 mt-7">
              Get Started
            </Button>
          </Link>
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
