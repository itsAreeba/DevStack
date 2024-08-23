// PasswordResetForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";

const PasswordResetForm = ({ onSubmit, errors }) => {
  const {
    register,
    handleSubmit,
    getValues,
  } = useForm({
    mode: "onChange",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="password"
        label="New Password"
        placeholder="Password"
        type="password"
        register={register("password", {
          required: "Password is required!",
        })}
        error={errors.password ? errors.password.message : ""}
      />
      <TextInput
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        register={register("confirmPassword", {
          validate: (value) => {
            const { password } = getValues();

            if (password !== value) {
              return "Passwords do not match";
            }
          },
        })}
        error={errors.confirmPassword ? errors.confirmPassword.message : ""}
      />
      <CustomButton
        type="submit"
        containerStyles={`bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-blue-800`}
        title="Reset Password"
      />
    </form>
  );
};

export default PasswordResetForm;
