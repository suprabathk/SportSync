import { SubmitHandler, useForm } from "react-hook-form";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
  current_password: string;
  new_password: string;
};

const ResetPassword = () => {
  const token = localStorage.getItem("authToken") ?? "";

  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [resetPasswordError, setResetPasswordError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { current_password, new_password } = data;

    try {
      setLoading(true);
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ current_password, new_password }),
      });
      const JSONData = await response.json();
      console.log(JSONData);

      setLoading(false);
      if (!response.ok) {
        setResetPasswordError(JSONData.message);
        throw new Error("Password reset failed");
      }
      console.log("Password reset successful");
      navigate("/");
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  function closeModal() {
    setIsOpen(false);
    navigate("../../");
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-sky-700 text-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl font-bold leading-6 text-white mb-2"
                  >
                    Reset your account password
                  </Dialog.Title>
                  <p className="mb-4 text-sm">Enter your credentials.</p>
                  <div className="mt-4 bg-white -m-6 p-6 text-black">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="w-full bg-white px-6 flex flex-col items-start justify-center"
                    >
                      <div className="mb-3">
                        <span className="text-red-500">
                          {resetPasswordError}
                        </span>
                      </div>
                      <div className="mb-6 w-full">
                        <label
                          htmlFor="current_password"
                          className="block mb-1 text-sm font-medium text-gray-900"
                        >
                          Current password
                        </label>
                        {errors.current_password && (
                          <span className="text-red-500">
                            Current password is required
                          </span>
                        )}
                        <input
                          type="password"
                          id="current_password"
                          {...register("current_password", { required: true })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                          placeholder="•••••••••"
                        />
                      </div>
                      <div className="mb-6 w-full">
                        <label
                          htmlFor="new_password"
                          className="block mb-1 text-sm font-medium text-gray-900"
                        >
                          New password
                        </label>
                        {errors.new_password && (
                          <span className="text-red-500">
                            New password is required
                          </span>
                        )}
                        <input
                          type="password"
                          id="new_password"
                          {...register("new_password", { required: true })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                          placeholder="•••••••••"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full md:w-fit bg-sky-600 text-white px-6 py-2 rounded-md hover:bg-sky-700 transition-colors"
                      >
                        {loading ? "Resetting..." : "Reset password"}
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ResetPassword;
