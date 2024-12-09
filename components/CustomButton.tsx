import React from "react";
import { Button } from "./ui/button";

interface CustomButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const CustomButton = ({ isLoading, children }: CustomButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full rounded bg-orange-600 text-white hover:bg-orange-500 mt-7"
    >
      {isLoading ? <div>Loading...</div> : children}
    </Button>
  );
};

export default CustomButton;
