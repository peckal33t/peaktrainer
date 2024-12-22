"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { X } from "lucide-react";
import { decryptKey, encryptKey } from "@/lib/utilities";

const Skeleton = () => {
  const router = useRouter();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [secretKey, setSecretKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isAuthorizationKey =
    typeof window !== "undefined"
      ? localStorage.getItem("authorizationKey")
      : null;

  const isAuthorizationTimestamp =
    typeof window !== "undefined"
      ? localStorage.getItem("authorizationTimestamp")
      : null;

  useEffect(() => {
    const decrypt = isAuthorizationKey && decryptKey(isAuthorizationKey);
    const timestamp = isAuthorizationTimestamp
      ? parseInt(isAuthorizationTimestamp, 10)
      : null;
    const now = Date.now();

    if (decrypt === process.env.NEXT_PUBLIC_AUTHORIZATION_CODE) {
      if (timestamp && now - timestamp <= 30 * 60 * 1000) {
        setIsOpen(false);
        router.push("/admin");
      } else {
        localStorage.removeItem("authorizationKey");
        localStorage.removeItem("authorizationTimestamp");
        setIsOpen(true);
      }
    } else {
      setIsOpen(true);
    }
  }, [isAuthorizationKey, isAuthorizationTimestamp]);

  const closePopUp = () => {
    setIsOpen(false);
    router.push("/");
  };

  const verifyCode = () => {
    if (secretKey === process.env.NEXT_PUBLIC_AUTHORIZATION_CODE) {
      const key = encryptKey(secretKey);

      localStorage.setItem("authorizationKey", key);
      localStorage.setItem("authorizationTimestamp", Date.now().toString());

      setIsOpen(false);
      router.push("/admin");
    } else {
      setErrorMessage("Access denied. The code you entered is incorrect.");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      verifyCode();
    }
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
              onClick={closePopUp}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To unlock access, provide the Authorization Code.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div onKeyDown={handleKeyDown} className="">
          <InputOTP
            maxLength={4}
            value={secretKey}
            onChange={(index) => setSecretKey(index)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
            </InputOTPGroup>
          </InputOTP>

          {errorMessage && (
            <p className="flex justify-center shad-error text-md mt-5">
              {errorMessage}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={verifyCode}
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
