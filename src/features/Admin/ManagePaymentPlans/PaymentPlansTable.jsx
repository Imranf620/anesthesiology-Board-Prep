import { toast } from "react-toastify";
import Button from "../../../components/UI/Button";
import ConfirmDelete from "../../../components/UI/ConfirmDelete";
import Modal from "../../../components/UI/Modal";
import Table from "../../../components/UI/Table";
import PaymentPlanForm from "./PaymentPlanForm";
import { useDeletePaymentPlan } from "./useDeletePaymentPlan";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const PaymentPlansTable = ({ paymentPlans }) => {
  const { deletePlan, isLoading } = useDeletePaymentPlan();
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();
  const ref = useRef(null);

  // Delete payment plan
  const deletePaymentPlan = (planName) => {
    const data = {
      username: localStorage.getItem("username"),
      Plan_Name: planName,
    };
    deletePlan(data, {
      onSuccess: (data) => {
        ref.current.click();
        toast.success(data.data.Message, { autoClose: 5000 });
        queryClient.invalidateQueries({ queryKey: ["payment-plans"] });
      },
      onError: (err) => {
        toast.error(err.message, { autoClose: 15000 });
      },
    });
  };

  return (
    <div className="min-w-[400px] overflow-x-auto">
      <Table>
        <Table.Head className="bg-primary-100">
          <Table.Row className="bg-primary-100 text-center font-[700] text-primary-500">
            <Table.Data className="text-start">Plan Name</Table.Data>
            <Table.Data>Price</Table.Data>
            <Table.Data>Active</Table.Data>
            <Table.Data>Edit</Table.Data>
            <Table.Data>Delete</Table.Data>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {paymentPlans?.map((plan) => (
            <Table.Row key={plan.Name} className="text-center">
              <Modal>
                <Table.Data className="text-start">{plan.Name}</Table.Data>
                <Table.Data>{plan.Price}</Table.Data>
                <Table.Data>{plan.isActive === "Y" ? "Yes" : "No"}</Table.Data>
                <Table.Data>
                  <Modal.Open id="edit">
                    <Button type="button" variant="underline">
                      Edit
                    </Button>
                  </Modal.Open>
                  <Modal.Window id="edit" closeOnOverlay={!isUpdating}>
                    <PaymentPlanForm
                      edit
                      plan={plan}
                      setIsSubmitting={setIsUpdating}
                    />
                  </Modal.Window>
                </Table.Data>
                <Table.Data>
                  <Modal.Open id="delete">
                    <Button variant="delete">Delete</Button>
                  </Modal.Open>
                  <Modal.Window center id="delete" closeOnOverlay={!isLoading}>
                    <ConfirmDelete
                      message={`Are you sure you want to delete ${plan.Name} plan? `}
                      onConfirm={() => deletePaymentPlan(plan.Name)}
                      isLoading={isLoading}
                      ref={ref}
                    />
                  </Modal.Window>
                </Table.Data>
              </Modal>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PaymentPlansTable;
