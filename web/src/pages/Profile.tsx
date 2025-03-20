import { useCallback, useEffect, useState } from "react";

import type { IUser } from "../../types";
import { API } from "../constants/api";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Spinner } from "../components/Spinner";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser>();

  const getUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get(
        `${import.meta.env.VITE_API_URL}/user/me`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const data = await response.data.user;
        setUser(data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = await error.response?.data.message;
        return toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading) {
    return (
      <div className="flex items-center justify-center my-20">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="py-5 max-w-xl mx-auto">
      <div className="flex flex-col items-center gap-5">
        {user?.image ? (
          <img
            src={
              user.image.startsWith("https://")
                ? user.image
                : `https://res.cloudinary.com/${
                    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                  }/image/upload/${user.image}`
            }
            alt={`${user?.name} profile`}
            className="w-36 h-36 rounded-full object-cover"
          />
        ) : (
          <div className="w-36 h-36 rounded-full bg-neutral-700">
            <h1 className="flex items-center justify-center my-auto h-full text-4xl font-black">
              {user?.name.split(" ").map((word) => `${word[0]}`)}
            </h1>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold">{user?.name}</h1>
            <p className="text-lg font-semibold">{user?.email}</p>
          </div>
          <div className="w-full">
            <button
              type="button"
              className="btn w-full"
              onClick={() => {
                const modal = document.getElementById(
                  "edit_profile_modal"
                ) as HTMLDialogElement;
                modal.showModal();
              }}
            >
              Edit profile
            </button>
            <dialog
              id="edit_profile_modal"
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Save changes after updating info
                </h3>
                <div className="w-full">
                  <form method="dialog">
                    <fieldset className="fieldset w-full gap-3">
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
                    </fieldset>

                    <button className="btn mt-5 w-full" type="submit">
                      Save changes
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>

      <div className="flex justify-evenly mt-5 max-w-2xs mx-auto">
        <div>
          <p className="font-bold">0 Followers</p>
        </div>
        <div>
          <p className="font-bold">0 Following</p>
        </div>
      </div>
    </div>
  );
}
