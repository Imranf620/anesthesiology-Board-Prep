import ManagePaymentPlans from "../../features/Admin/ManagePaymentPlans/ManagePaymentPlans";
import ManagePromotions from "../../features/Admin/ManagePromotions/ManagePromotions";

const ManagePaymentPlansPage = () => {
  return (
    <div className="px-1 py-10 sm:px-4 md:px-10 md:py-5">
      <ManagePaymentPlans />
      <ManagePromotions />
    </div>
  );
};

export default ManagePaymentPlansPage;
