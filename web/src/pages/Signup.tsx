import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { API } from "../constants/api";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File>();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  }

  async function handleSignupWithCreds() {
    try {
      setLoading(true);
      // upload profile image
      let imageUrl = "";
      if (image) {
        const response = await API.get("/media/url?type=image");
        const { signature, uploadPreset, timestamp, apiKey } =
          await response.data;

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", uploadPreset);
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);
        formData.append("api_key", apiKey);

        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
          }/image/upload`,
          formData
        );
        imageUrl = await uploadResponse.data.public_id;
      }

      const signupResponse = await API.post("/auth/signup", {
        image: imageUrl ?? "",
        ...userInfo,
      });

      if (signupResponse.status === 201) {
        const data = await signupResponse.data.accessToken;
        localStorage.setItem("token", data);
        toast.success("Signed up successfully...");
        window.location.replace("/home");
        return;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = await error.response?.data.message;
        toast.error(errorData);
        return;
      }
    } finally {
      setLoading(false);
    }
  }

  async function signupWithGoogle() {
    window.open(`${import.meta.env.VITE_API_URL}/auth/login/google`, "_self");
  }

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
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input w-full"
                    required={false}
                  />
                  {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                  <label className="fieldset-label">Max size 2MB</label>
                </fieldset>
              </div>

              <div className="space-y-1">
                <label className="fieldset-label" htmlFor="name">
                  Name
                </label>
                <input
                  required
                  type="text"
                  className="input w-full"
                  placeholder="Name"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                  value={userInfo.name}
                />
              </div>

              <div className="space-y-1">
                <label className="fieldset-label" htmlFor="email">
                  Email
                </label>
                <input
                  required
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                  value={userInfo.email}
                />
              </div>

              <div className="space-y-1">
                <label className="fieldset-label" htmlFor="password">
                  Password
                </label>
                <input
                  required
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                  value={userInfo.password}
                />
              </div>

              <div className="space-y-1">
                <label className="fieldset-label" htmlFor="confirmPassword">
                  Confirm password
                </label>
                <input
                  required
                  type="password"
                  className="input w-full"
                  placeholder="Confirm password"
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      confirmPassword: e.target.value,
                    })
                  }
                  value={userInfo.confirmPassword}
                />
              </div>

              <button
                type="submit"
                disabled={
                  loading ||
                  userInfo.password !== userInfo.confirmPassword ||
                  userInfo.email.length < 3 ||
                  userInfo.name.length < 3
                }
                className="btn btn-neutral mt-5"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignupWithCreds();
                }}
              >
                Signup
              </button>

              <p className="my-2 text-center text-lg font-extrabold">or</p>

              <div>
                <button
                  type="button"
                  disabled={loading}
                  className="btn btn-neutral w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    signupWithGoogle();
                  }}
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      <FcGoogle />
                      Continue with Google
                    </>
                  )}
                </button>
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
