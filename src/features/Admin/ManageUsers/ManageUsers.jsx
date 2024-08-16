import { useEffect, useState } from "react";
import Heading from "../../../components/UI/Heading";
import DisplayUsers from "./DisplayUsers";
import SearchUser from "./SearchUser";
import { useGetUsers } from "./useGetUsers";
import Button from "../../../components/UI/Button";
import AddUserForm from "./AddUserForm";

const ManageUsers = () => {
  const { users, isLoading } = useGetUsers();
  const [displayUsers, setDisplayUsers] = useState();
  const [isAddUser, setIsAddUser] = useState(false);

  // Handle search
  const handleSearch = (category, searchText) => {
    const regExp = new RegExp(searchText, "i");
    const newUsers = users.usersList.filter((usr) => {
      if (category === "Name") {
        return regExp.test(usr.Name);
      } else if (category === "Email") {
        return regExp.test(usr.email);
      } else if (category === "Status") {
        return regExp.test(usr.Status);
      } else {
        return regExp.test(usr.Name);
      }
    });
    setDisplayUsers(newUsers);
  };

  useEffect(() => {
    setDisplayUsers(users?.usersList);
  }, [users]);

  return (
    <div className="px-3 py-5 md:px-10">
      <div className="flex items-center justify-between">
        <Heading>Manage Users</Heading>
        {!isAddUser && (
          <Button variant="dark" onClick={() => setIsAddUser((prev) => !prev)}>
            Add User
          </Button>
        )}
      </div>
      {isAddUser && <AddUserForm onClose={() => setIsAddUser(false)} />}
      <SearchUser onHandleSearch={handleSearch} />
      <DisplayUsers users={displayUsers} isLoading={isLoading} />
    </div>
  );
};

export default ManageUsers;
