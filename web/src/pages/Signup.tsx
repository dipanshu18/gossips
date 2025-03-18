import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";

export default function Signup() {
  return (
    <div className="hero mt-10">
      <div className="hero-content flex-col">
        <div>
          <h1 className="text-4xl font-extrabold mb-2">
            Welcome to Gossips 👋
          </h1>
        </div>

        <div className="card bg-base-200 w-full min-w-lg shrink-0 shadow-lg">
          <div className="card-body">
            <fieldset className="fieldset gap-3">
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">
                    Upload your profile photo
                  </legend>
                  <input type="file" className="file-input w-full" />
                  {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                  <label className="fieldset-label">Max size 2MB</label>
                </fieldset>
              </div>

              <div className="space-y-1">
                <label className="fieldset-label" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Name"
                />
              </div>

              <div className="space-y-1">
                <label className="fieldset-label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                />
              </div>

              <div className="space-y-1">
                <label className="fieldset-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                />
              </div>

              <div>
                <Link to={"#"} className="link link-hover">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className="btn btn-neutral">
                Signup
              </button>

              <p className="my-2 text-center text-lg font-extrabold">or</p>

              <div>
                <Link to={"#"} className="btn btn-neutral w-full">
                  <FcGoogle />
                  Continue with Google
                </Link>
              </div>

              <div className="mt-2">
                <p>
                  Already have an account?{" "}
                  <Link to={"/login"} className="link font-bold">
                    Login
                  </Link>
                </p>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}
