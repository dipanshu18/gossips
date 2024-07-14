"use client";

interface ButtonProps {
  text: string;
}

export const OutlineButton = ({ text }: ButtonProps) => {
  return <button className="btn btn-outline">{text}</button>;
};
