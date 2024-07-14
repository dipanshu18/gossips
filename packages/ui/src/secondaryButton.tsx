"use client";

interface ButtonProps {
  text: string;
}

export const SecondaryButton = ({ text }: ButtonProps) => {
  return <button className="btn">{text}</button>;
};
