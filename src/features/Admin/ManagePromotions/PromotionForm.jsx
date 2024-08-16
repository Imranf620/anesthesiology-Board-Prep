import { useForm } from "react-hook-form";
import Input from "../../../components/UI/Input";
import Button from "../../../components/UI/Button";
import { useState } from "react";
import { useCreatePromotion } from "./useCreatePromotion";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const PromotionForm = ({ onCloseModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createPromotion, isLoading } = useCreatePromotion();
  const [radioOption, setRadioOption] = useState("");
  const queryClient = useQueryClient();

  const onSubmit = (data) => {
    const preparedData = {
      username: localStorage.getItem("username"),
      Code: data.percentage + "OFF",
      Validity: data.validity,
      OffPercentage: data.percentage,
      Plan: data.planName,
    };
    createPromotion(preparedData, {
      onSuccess: (res) => {
        toast.success(res.data.Message || res.data.message, {
          autoClose: 5000,
        });
        queryClient.invalidateQueries({ queryKey: ["admin-promotions"] });
        onCloseModal();
      },
      onError: (err) => {
        toast.error(err.message, { autoClose: 15000 });
      },
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="bg-primary-500 py-3 text-center text-[1.3rem] font-[600] uppercase tracking-wider text-primary-100">
        Create Promotion
      </h1>
      <form
        className="mt-5 flex flex-col gap-3 px-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Plan Name"
          required="Plan name is required!"
          id="planName"
          error={errors?.planName?.message}
          type="text"
          register={register}
          autoFocus
        />
        <Input
          label="OFF Percentage"
          register={register}
          required="OFF Percentage is required!"
          id="percentage"
          error={errors?.percentage?.message}
          type="number"
          min={0}
        />
        <Input
          label="Validity"
          register={register}
          required="Validity is required!"
          id="validity"
          error={errors?.validity?.message}
          type="date"
          min={new Date().toISOString().split("T")[0]}
        />

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <input
              className="h-4 w-4 accent-primary-400"
              type="radio"
              id="specific"
              checked={radioOption === "specific"}
              onChange={(e) => setRadioOption(e.target.id)}
            />
            <label htmlFor="specific">Specific</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              className="h-4 w-4 accent-primary-400"
              type="radio"
              id="general"
              checked={radioOption === "general"}
              onChange={(e) => setRadioOption(e.target.id)}
            />
            <label htmlFor="general">General</label>
          </div>
        </div>

        <div className="mb-5 flex justify-end">
          <Button
            type="submit"
            variant="dark"
            className="px-8"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
