"use client";

interface ButtonProps {
  text: string;
}

export const PrimaryButton = ({ text }: ButtonProps) => {
  return <button className="btn btn-primary">{text}</button>;
};
