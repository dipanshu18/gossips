import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold text-center my-5">Login</h1>
      <LoginForm />

      <p className="my-5 text-center">
        Not have an account?{" "}
        <Link href={"/signup"}>
          <span className="underline font-semibold">Signup</span>
        </Link>
      </p>
    </div>
  );
}
