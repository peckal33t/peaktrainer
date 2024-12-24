import Image from "next/image";
import Link from "next/link";
import successGif from "@/app/assets/images/success.gif";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/service/client";
import { SearchParamProps } from "@/types";

const SuccessPage = async ({ params }: SearchParamProps) => {
  const userId = params.userId;
  const client = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <h1 className="text-2xl">
            Peak<span className="text-orange-500">Trainer</span>
          </h1>
        </Link>

        <div className="flex flex-col items-center">
          <Image
            src={successGif}
            height={300}
            width={280}
            alt="success"
            unoptimized
          />
          <h1 className="text-xl">
            Your appointment has been{" "}
            <span className="text-orange-500">successfully scheduled!</span> 🎉
          </h1>
          <p className="mt-4 text-dark-700">
            {" "}
            We’re excited to see you{" "}
            <span className="text-white">{client.name}!</span> You will receive
            a SMS-confirmation with all the details shortly.
          </p>
        </div>

        <Button
          type="button"
          className="rounded bg-orange-600 text-white hover:bg-orange-500 mt-7"
          asChild
        >
          <Link href={`/clients/${userId}/create-appointment`}>
            Create new appointment
          </Link>
        </Button>

        <p className="copyright">© 2024 PeakTrainer, All Rights Reserved</p>
      </div>
    </div>
  );
};

export default SuccessPage;
