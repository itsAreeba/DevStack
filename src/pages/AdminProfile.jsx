import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiLink } from "react-icons/fi";
import { CustomButton, Loading, TextInput } from "../components";
import { NoProfile } from "../assets";
import { apiRequest, handleFileUpload } from "../utils";
import { Login } from "../redux/userSlice";
import UserSkills from "./UserSkills";
import { FaUserAstronaut } from "react-icons/fa";
import "./style.css";

const UserForm = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [uploadCv, setUploadCv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errMsg, setErrMsg] = useState({ status: false, message: "" });

  const [formData, setFormData] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setFormData(data);


   



    try {
      let formData = { ...data };

  

      // Upload profile image if available
      if (profileImage) {
        const uri = await handleFileUpload(profileImage);
        formData = { ...formData, profileUrl: uri };
      }

      if (uploadCv) {
        const uri = await handleFileUpload(uploadCv);
        formData = { ...formData, cvUrl: uri };
      }

      console.log(formData);

      const res = await apiRequest({
        url: "/users/update-user",
        token: user?.token,
        data: formData,
        method: "PUT",
      });

      setIsSubmitting(false);

      window.location.reload(false);

      if (res.status === "failed") {
        setErrMsg({ ...res });
      } else {
        setErrMsg({ status: "success", message: res.message });
        // const newData = { token: res?.token, ...res?.user };
        dispatch(Login(res));
        localStorage.setItem("userInfo", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const closeModal = () => setOpen(false);

  return (
    <>
      <Transition appear show={open ?? false} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Edit Profile
                  </Dialog.Title>
                  <form
                    className="w-full mt-2 flex flex-col gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="w-full flex gap-2">
                      <div className="w-1/2">
                        <TextInput
                          name="firstName"
                          label="First Name"
                          placeholder="James"
                          type="text"
                          register={register("firstName", {
                            required: "First Name is required",
                          })}
                          error={
                            errors.firstName ? errors.firstName?.message : ""
                          }
                        />
                      </div>
                      <div className="w-1/2">
                        <TextInput
                          name="lastName"
                          label="Last Name"
                          placeholder="Wagonner"
                          type="text"
                          register={register("lastName", {
                            required: "Last Name is required",
                          })}
                          error={
                            errors.lastName ? errors.lastName?.message : ""
                          }
                        />
                      </div>
                    </div>

                    <div className="w-full flex gap-2">
                      <div className="w-1/2">
                        <TextInput
                          name="contact"
                          label="Contact"
                          placeholder="Phone Number"
                          type="text"
                          register={register("contact", {
                            required: "Coontact is required!",
                          })}
                          error={errors.contact ? errors.contact?.message : ""}
                        />
                      </div>

                      <div className="w-1/2">
                        <TextInput
                          name="location"
                          label="Location"
                          placeholder="Location"
                          type="text"
                          register={register("location", {
                            required: "Location is required",
                          })}
                          error={
                            errors.location ? errors.location?.message : ""
                          }
                        />
                      </div>
                    </div>

                    <div className="w-full flex gap-2 text-sm">
                      <div className="w-1/2">
                        <label className="text-gray-600 text-sm mb-1">
                          Profile Picture
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-gray-600 text-sm mb-1">
                        About
                      </label>
                      <textarea
                        className="ounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required:
                            "",
                        })}
                        aria-invalid={errors.about ? "true" : "false"}
                      ></textarea>
                      {errors.about && (
                        <span
                          role="alert"
                          className="text-xs text-red-500 mt-0.5"
                        >
                          {errors.about?.message}
                        </span>
                      )}
                    </div>

                    <div className="mt-4">
                      {isSubmitting ? (
                        <Loading />
                      ) : (
                        <CustomButton
                          type="submit"
                          containerStyles="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
                          title={"Submit"}
                        />
                      )}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const AdminProfile = () => {
  // Project related functions

  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const userInfo = user;
  useEffect(() => {
    if (userInfo?.accountType !== "admin") {
      window.location.replace("/");
      }

  }, []);
  return (
    <>
      <div className="container mx-auto flex items-center justify-center py-10">
        <div className="w-full md:w-2/3 2xl:w-2/4 bg-white shadow-lg p-10 pb-20 rounded-lg">
          <div className="flex flex-col items-center justify-center mb-4">
            <h1 className="text-4xl font-semibold text-slate-600">
              {userInfo?.firstName + " " + userInfo?.lastName}
            </h1>

            <h5 className="text-blue-700 text-base font-bold">
              DevStack Admin
            </h5>

            <div className="w-full flex flex-wrap lg:flex-row justify-between mt-8 text-sm">
              <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
                <HiLocationMarker /> {userInfo?.location ?? "No Location"}
              </p>
              <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
                <AiOutlineMail /> {userInfo?.email ?? "No Email"}
              </p>
              <p className="flex gap-1 items-center justify-center  px-3 py-1 text-slate-600 rounded-full">
                <FiPhoneCall /> {userInfo?.contact ?? "No Contact"}
              </p>
              
            </div>
          </div>

          <hr />

          <div className="w-full py-10">
            <div className="w-full flex flex-col-reverse md:flex-row gap-8 py-6">
              <div className="w-full md:w-2/3 flex flex-col gap-4 text-lg text-slate-600 mt-20 md:mt-0">
                <p className="text-[#0536e7]  font-semibold text-2xl">ABOUT</p>
                <span className="text-base text-justify leading-7">
                  {userInfo?.about ?? "No About Found"}
                </span>
              </div>

              <div className="w-full md:w-1/3 h-44">
                <img
                  src={userInfo?.profileUrl || NoProfile}
                  alt={userInfo?.firstName}
                  className="w-full h-56 object-cover rounded-full object-center"
                />
                <button
                  className="w-full md:w-64 bg-blue-600 text-white mt-4 py-2 rounded"
                  onClick={() => setOpen(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserForm open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default AdminProfile;
