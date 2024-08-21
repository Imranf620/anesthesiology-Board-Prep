import { useForm } from 'react-hook-form';
import Input from '../../../components/UI/Input';
import Button from '../../../components/UI/Button';
import { useCreatePaymentPlan } from './useCreatePaymentPlan';
import { useUpdatePaymentPlan } from './useUpdatePaymentPlan';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { HiX } from 'react-icons/hi';

const PaymentPlanForm = ({ edit, plan, onCloseModal, setIsSubmitting }) => {
  console.log(plan);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: edit
      ? {
          planName: plan.Name,
          price: plan.Price,
        }
      : {},
  });
  const { createPlan, isLoading } = useCreatePaymentPlan();
  const { updatePlan, isLoading: isUpdating } = useUpdatePaymentPlan();
  const [descriptions, setDescriptions] = useState(
    (edit &&
      plan.Description &&
      plan.Description.split(' \n ').map((itm, i) => ({ id: i, desc: itm }))) ||
      [],
  );

  const [checked, setChecked] = useState(edit && plan.isActive === 'Y');
  const [descError, setDescError] = useState('');

  const queryClient = useQueryClient();

  const handleAddDescriptions = () => {
    const desc = getValues().desc;
    if (!desc) return;

    if (descriptions.length >= 6) {
      setDescError('You can only add up to 6 descriptions.');
      return;
    }

    setDescriptions((prev) => [...prev, { id: Math.random() * 1000000, desc }]);
    setValue('desc', '');
    setDescError('');
  };

  const handleRemoveDesc = (id) => {
    setDescriptions((prev) => prev.filter((itm) => itm.id !== id));
  };

  const onSubmit = (data) => {
    if (!descriptions.length)
      return toast.error('Please add at least one description', {
        autoClose: 6000,
      });

    const prepareData = {
      username: localStorage.getItem('username'), // Fetch username from localStorage
      Plan_Name: data.planName,
      Price: +data.price,
      Description: descriptions.map((desc) => desc.desc).join(' \n '), // Combine descriptions
      isActive: checked ? 'Y' : 'N',
    };

    if (edit) {
      // If edit then update the plan
      setIsSubmitting?.(true);
      updatePlan(prepareData, {
        onSuccess: (data) => {
          console.log('Update Success:', data);
          toast.success(data.data.Message, { autoClose: 5000 });
          queryClient.invalidateQueries({ queryKey: ['payment-plans'] });
          onCloseModal();
        },
        onError: (err) => {
          console.error('Update Error:', err);
          toast.error(err.message, { autoClose: 15000 });
        },
        onSettled: () => setIsSubmitting?.(false),
      });
    } else {
      // If not edit then create the plan
      setIsSubmitting?.(true);
      const createData = {
        username: localStorage.getItem('username'),
        Subscription_Plan: {
          Name: data.planName,
          Price: +data.price,
          Description: descriptions.map((desc) => desc.desc).join(' \n '),
        },
      };
      console.log(createData);
      createPlan(createData, {
        onSuccess: (data) => {
          console.log('Create Success:', data);
          toast.success(data.data.Message || data.data.message, {
            autoClose: 5000,
          });
          queryClient.invalidateQueries({ queryKey: ['payment-plans'] });
          onCloseModal();
        },
        onError: (err) => {
          console.error('Create Error:', err);
          toast.error(err.message, { autoClose: 15000 });
        },
        onSettled: () => setIsSubmitting?.(false),
      });
    }
  };

  return (
    <div className="h-[70dvh] w-full overflow-y-auto">
      <h1 className="w-full bg-primary-500 py-3 text-center text-[1.3rem] font-[700] uppercase tracking-wider text-primary-100">
        {edit ? 'Edit' : 'Add'} Payment Plan
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 px-5 py-6"
      >
        {/* Plan Name */}
        <Input
          autoFocus
          label="Plan Name"
          id="planName"
          type="text"
          register={register}
          required="Payment Plan is required!"
          error={errors?.planName?.message}
          disabled={edit}
        />
        {/* Plan price */}
        <Input
          label="Price"
          id="price"
          type="number"
          min={0}
          step="any"
          register={register}
          required="Payment Plan is required!"
          error={errors?.price?.message}
        />

        <div className="flex flex-col gap-3">
          <Input
            register={register}
            id="desc"
            type="text"
            label="Descriptions"
            textArea={false}
          />
          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleAddDescriptions}
              variant="dark"
            >
              Add
            </Button>
          </div>
          {descError && <span className="text-red-500">{descError}</span>}
        </div>
        {descriptions.length > 0 && (
          <div className="my-2">
            <ul className="flex flex-col gap-3 px-3">
              {descriptions.map((desc, i) => (
                <li
                  className="flex items-center justify-between bg-primary-100 px-3 py-2"
                  key={i}
                >
                  <span>{desc.desc}</span>
                  <HiX
                    className="cursor-pointer text-[1.2rem] hover:scale-110"
                    onClick={() => handleRemoveDesc(desc.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {edit && (
          <div className="flex items-center gap-3">
            {/* IF edit check if active or not */}
            <input
              className="h-4 w-4 cursor-pointer accent-primary-500"
              type="checkbox"
              id="active"
              onChange={(e) => setChecked(e.target.checked)}
              checked={checked}
            />
            <label htmlFor="active" className="cursor-pointer font-[600]">
              Active
            </label>
          </div>
        )}

        <Button
          variant="dark"
          type="submit"
          disabled={isLoading || isUpdating}
          isLoading={isLoading || isUpdating}
        >
          {edit ? 'Save Changes' : 'Save'}
        </Button>
      </form>
    </div>
  );
};

export default PaymentPlanForm;
