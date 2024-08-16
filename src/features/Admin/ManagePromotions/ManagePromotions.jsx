import Button from "../../../components/UI/Button";
import LoadingSpinner from "../../../components/UI/LoadingSpinner";
import Modal from "../../../components/UI/Modal";
import PromotionForm from "./PromotionForm";
import PromotionsTable from "./PromotionsTable";
// import { useGetPromotions } from "./useGetPromotions";
import { useGetPromotions } from "./useGetPromotions";

const ManagePromotions = () => {
  const { promotions, isLoading, isError } = useGetPromotions();
  return (
    <section className="mt-5 w-full">
      <div className="rounded-lg bg-white px-5 py-10 shadow-lg">
        <Modal>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-[1.1rem] font-[600] uppercase tracking-wider sm:text-[1.5rem]">
              Promotions
            </h2>
            <Modal.Open id="createProm">
              <Button variant="dark">Create Promotion</Button>
            </Modal.Open>
            <Modal.Window closeOnOverlay id="createProm">
              <PromotionForm />
            </Modal.Window>
          </div>
          {isLoading && (
            <div className="my-8 flex justify-center">
              <LoadingSpinner width="40px" height="40px" border="5px" />
            </div>
          )}

          {promotions && promotions.length === 0 && (
            <div className="mt-16 flex flex-col items-center">
              <p>No Promotions created yet!</p>
              <Modal.Open id="createProm">
                <Button variant="underline">Create</Button>
              </Modal.Open>
            </div>
          )}
        </Modal>
        <div className="overflow-hidden">
          {promotions && promotions.length > 0 && (
            <PromotionsTable promotions={promotions} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ManagePromotions;
