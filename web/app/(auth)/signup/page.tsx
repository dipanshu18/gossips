import SignupForm from "@/components/SignupForm";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold text-center my-5">Signup</h1>
      <SignupForm />

      <p className="my-5 text-center">
        Already have an account?{" "}
        <Link href={"/login"}>
          <span className="underline font-semibold">Login</span>
        </Link>
      </p>
    </div>
  );
}
