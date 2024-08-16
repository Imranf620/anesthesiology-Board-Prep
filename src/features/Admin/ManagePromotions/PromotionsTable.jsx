import { useRef } from "react";
import Button from "../../../components/UI/Button";
import ConfirmDelete from "../../../components/UI/ConfirmDelete";
import Modal from "../../../components/UI/Modal";
import Table from "../../../components/UI/Table";
import PromotionForm from "./PromotionForm";
import { useDeletePromotion } from "./useDeletePromotion";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const PromotionsTable = ({ promotions }) => {
  const { deletePromotion, isLoading } = useDeletePromotion();
  const queryClient = useQueryClient();

  const handleDelete = (prom) => {
    const data = {
      username: localStorage.getItem("username"),
      Code: prom.Code,
    };

    deletePromotion(data, {
      onSuccess: (success) => {
        toast.success(success.data.Message || success.data.message, {
          autoClose: 5000,
        });
        queryClient.invalidateQueries({ queryKey: ["admin-promotions"] });
      },
      onError: (err) => {
        toast.error(err.message, { autoClose: 15000 });
      },
    });
  };

  return (
    <div className="w-full min-w-[400px] overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.Row className="bg-primary-100 text-center font-[700] text-primary-500">
            <Table.Data className="text-start">Plan</Table.Data>
            <Table.Data>OFF Percentage</Table.Data>
            <Table.Data>Promotion Code</Table.Data>
            <Table.Data>Validity</Table.Data>
            <Table.Data>Active</Table.Data>
            <Table.Data className="text-center">Delete</Table.Data>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {promotions?.map((prom, i) => (
            <Table.Row key={i} className="text-center">
              <Modal>
                <Table.Data className="text-start">{prom.Plan}</Table.Data>
                <Table.Data>{prom.OffPercentage} %</Table.Data>
                <Table.Data>{prom?.Code} </Table.Data>
                <Table.Data>
                  <div className="mx-auto w-max">{prom.Validity}</div>
                </Table.Data>
                <Table.Data>{prom.isActive === "Y" ? "Yes" : "No"}</Table.Data>

                <Table.Data>
                  <Modal.Open id="delProm">
                    <Button variant="delete">Delete</Button>
                  </Modal.Open>
                  <Modal.Window id="delProm" closeOnOverlay={!isLoading} center>
                    <ConfirmDelete
                      message={`Are you sure you want to delete ${prom.Plan} promotion?`}
                      onConfirm={() => handleDelete(prom)}
                      isLoading={isLoading}
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

export default PromotionsTable;
