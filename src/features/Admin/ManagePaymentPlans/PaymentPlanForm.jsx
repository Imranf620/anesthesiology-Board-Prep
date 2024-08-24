import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../components/UI/Button';
import PaymentPlanCard from '../../../components/UI/PaymentPlanCard';
import { useGetPaymentPlans } from '../ManagePaymentPlans/useGetPaymentPlans';
import FullPageLoading from '../../../components/UI/FullPageLoading';
import { useCreatePaymentPlan } from './useCreatePaymentPlan';
import { useUpdatePaymentPlan } from './useUpdatePaymentPlan';

// EditableText component for inline editing
const EditableText = ({ value, onSave, editable = true }) => {
  const [isEditing, setIsEditing] = useState(editable);
  const [text, setText] = useState(value);

  const handleSave = () => {
    setIsEditing(false);
    onSave(text);
  };

  return isEditing ? (
    <input
      type="text"
      className="w-full rounded border px-2 py-1"
      value={text}
      onChange={e => setText(e.target.value)}
      onBlur={handleSave}
      autoFocus
    />
  ) : (
    <span onClick={() => setIsEditing(true)}>{value}</span>
  );
};

const PaymentPlanForm = ({ edit, plan: initialPlan, setIsSubmitting }) => {
  const { paymentPlans, isLoading } = useGetPaymentPlans();
  const { createPlan } = useCreatePaymentPlan();
  const { updatePlan } = useUpdatePaymentPlan();
  const [isSubmitting, setSubmitting] = useState(false);

  // Initialize plan state
  const [plan, setPlan] = useState({
    Name: '',
    Price: 0,
    Description: '',
    isActive: true,
    ...initialPlan,
  });

  const [descriptions, setDescriptions] = useState([]); // Start with no descriptions

  const handleAddDescription = () => {
    if (descriptions.length < 6) {
      setDescriptions([...descriptions, '']);
    }
  };

  const handleDescriptionChange = (index, newDescription) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = newDescription;
    setDescriptions(updatedDescriptions);
  };

  const handleSavePrice = newPrice => {
    setPlan(prevPlan => ({ ...prevPlan, Price: newPrice.replace('$', '') }));
  };

  const handleNameChange = (newName) => {
    setPlan((prevPlan) => ({ ...prevPlan, Name: newName }));
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const planData = {
      ...plan,
      Description: descriptions.join(' \n '),
    };

    const prepareData = {
      username: localStorage.getItem('username'),
      Price: +planData.Price,
      Description: planData.Description,
      isActive: planData.isActive,
    };

    if (edit) {
      // If editing, include the plan name
      prepareData.Plan_Name = plan.Name;

      updatePlan(prepareData, {
        onSuccess: data => {
          toast.success(data.data.Message, { autoClose: 5000 });
          setSubmitting(false);
          setIsSubmitting(false);
        },
        onError: err => {
          toast.error(err.message, { autoClose: 15000 });
          setSubmitting(false);
          setIsSubmitting(false);
        },
      });
    } else {
      // If creating, include the name field
      prepareData.Subscription_Plan = {
        Name: planData.Name,
        Price: +planData.Price,
        Description: planData.Description,
      };

      createPlan(prepareData, {
        onSuccess: data => {
          toast.success(data.data.Message || data.data.message, { autoClose: 5000 });
          setSubmitting(false);
          setIsSubmitting(false);
        },
        onError: err => {
          toast.error(err.message, { autoClose: 15000 });
          setSubmitting(false);
          setIsSubmitting(false);
        },
      });
    }
  };

  return (
    <>
      {isLoading && <FullPageLoading />}
      {paymentPlans && (
        <section className="my-10 gap-4">
          <PaymentPlanCard key={plan ? plan.Name : 'new'}>
            <h4 className="text-center text-[1rem] font-[600] text-green-900 md:text-[1.3rem]">
              {edit ? (
                <span>{plan.Name}</span> // Non-editable when editing
              ) : (
                <input
                  type="text"
                  className="w-full rounded border px-2 py-1"
                  placeholder="Enter plan name"
                  value={plan.Name}
                  onChange={e => handleNameChange(e.target.value)}
                  autoFocus
                />
              )}
            </h4>
            <div className="flex justify-center">
              <h2 className="text-[2rem] font-[600] md:text-[3rem]">
                <EditableText
                  value={`$${plan.Price}`}
                  onSave={handleSavePrice}
                />
                <span className="text-[1rem] font-[500] text-gray-500">
                  /month
                </span>
              </h2>
            </div>
            <ul className="flex list-none flex-col gap-3 px-3 text-[0.9rem] md:text-[1rem]">
              {descriptions.map((description, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-green-500">&#10003;</span>
                  <input
                    type="text"
                    className="w-full rounded border px-2 py-1"
                    value={description}
                    onChange={e => handleDescriptionChange(index, e.target.value)}
                    placeholder="Enter description"
                  />
                </li>
              ))}
            </ul>
            <Button
              variant="link"
              type="button"
              onClick={handleAddDescription}
              disabled={descriptions.length >= 6 || descriptions.some(desc => desc.trim() === '')}
              className='disabled:bg-transparent'
            >
              { descriptions.length >=1 ? "+ Add another description":"Add Description"}
            </Button>
            <Button
              variant="dark"
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              isLoading={isSubmitting}
            >
              Save
            </Button>
          </PaymentPlanCard>
        </section>
      )}
    </>
  );
};

export default PaymentPlanForm;
