import { useState } from "react";
import Button from "../../../components/UI/Button";
import Heading from "../../../components/UI/Heading";

import Modal from "../../../components/UI/Modal";
import PaymentPlanForm from "./PaymentPlanForm";
import PaymentPlans from "./PaymentPlans";

const ManagePaymentPlans = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3">
      <Heading className="mb-5">Manage Payment Plans</Heading>
      <Modal>
        <Modal.Open>
          <Button variant="dark">Add Payment</Button>
        </Modal.Open>
        <Modal.Window closeOnOverlay={!isSubmitting}>
          {/* Payment plan form */}
          <PaymentPlanForm setIsSubmitting={setIsSubmitting} />
        </Modal.Window>
      </Modal>
      <PaymentPlans />
    </div>
  );
};

export default ManagePaymentPlans;
