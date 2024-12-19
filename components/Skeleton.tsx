"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { X } from "lucide-react";

const Skeleton = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const closePopUp = () => {
    setIsOpen(false);
    router.push("/");
  };

  const verifyCode = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Authorization Code
            <X
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => closePopUp()}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To unlock access, provide the Authorization Code.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="">
          <InputOTP
            maxLength={4}
            value={code}
            onChange={(index) => setCode(index)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="flex justify-center shad-error text-14-regualar mt-4">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(event) => verifyCode(event)}
            className="w-full rounded bg-orange-600 text-white hover:bg-orange-500 mt-7"
          >
            Verify
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Skeleton;
