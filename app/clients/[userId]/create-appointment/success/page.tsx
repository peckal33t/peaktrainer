import Link from "next/link";

const SuccessPage = () => {
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <h1 className="text-2xl">
            Peak<span className="text-orange-500">Trainer</span>
          </h1>
        </Link>

        <div className="flex flex-col items-center">
          <h1 className="text-xl">
            Your appointment has been{" "}
            <span className="text-orange-500">successfully scheduled!</span> 🎉
          </h1>
          <p className="mt-2 text-dark-700">
            {" "}
            We’re excited to see you! You will receive a SMS-confirmation with
            all the details shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
