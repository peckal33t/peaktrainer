import React from "react";
import { Button } from "./ui/button";

interface CustomButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

const CustomButton = ({
  isLoading,
  children,
  className,
}: CustomButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={
        className ??
        "w-full rounded bg-orange-600 text-white hover:bg-orange-500 mt-7"
      }
    >
      {isLoading ? <div>Loading...</div> : children}
    </Button>
  );
};

export default CustomButton;
