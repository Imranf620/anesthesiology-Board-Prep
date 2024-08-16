import { useParams } from "react-router-dom";
import DisplayUserDetails from "../../features/Admin/ManageUsers/DisplayUserDetails";

const DisplayUserDetailsPage = () => {
  const { userId } = useParams();
  return <DisplayUserDetails userId={userId} />;
};

export default DisplayUserDetailsPage;
