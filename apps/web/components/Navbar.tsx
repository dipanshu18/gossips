import Link from "next/link";

export default function Navbar() {
  return (
    <div className="relative navbar bg-base-300 shadow-lg">
      <div className="navbar-start">
        <span className="btn btn-ghost text-xl">Gossips</span>
      </div>
      <div className="navbar-end">
        <Link href={"/"} className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
}
