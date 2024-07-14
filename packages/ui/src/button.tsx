"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return <button className="px-5 py-3 bg-rose-500 rounded">{children}</button>;
};
