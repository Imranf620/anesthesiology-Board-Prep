import { HiArrowLeft } from 'react-icons/hi2';
import Button from '../../../components/UI/Button';
import Heading from '../../../components/UI/Heading';
import { useGetUsers } from './useGetUsers';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../components/UI/Avatar';
import PerformanceTable from '../../Performance/PerformanceTable';
import { useRef, useState } from 'react';
import Modal from '../../../components/UI/Modal';
import ConfirmDelete from '../../../components/UI/ConfirmDelete';
import UserConfirm from './UserConfirm';

const DisplayUserDetails = ({ userId }) => {
  const { users, isLoading } = useGetUsers();
  const navigate = useNavigate();
  const ref = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(null);

  let user;
  if (users) {
    user = users.usersList.find(usr => usr.username === userId);
  }

  const handleChange = e => {
    ref.current.click();
  };

  const handleEditClick = () => {
    setEditableUser(user);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Implement your save logic here
    console.log('Save:', editableUser);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser(prev => ({ ...prev, [name]: value }));
  };

  
  return (
    <div className="px-2 py-5 md:px-7">
      <Button
        onClick={() => navigate(-1)}
        variant="underline"
        className="flex items-center gap-5"
      >
        <HiArrowLeft />
        <span> Go Back</span>
      </Button>
      <Heading className="mt-6">User Details</Heading>

      <section>
        <div className="flex justify-center">
          <Avatar width="50px" height="50px" />
        </div>
      </section>
      <section className="mt-10 flex flex-col gap-8 rounded-xl bg-white px-8 py-10 shadow-lg">
      <div className="flex items-center justify-between">
  <h3 className="text-center text-[1.7rem] font-[500]">
    User Information
  </h3>
  <div>
    {!isEditing && (
      <Button onClick={handleEditClick} type="button" variant="underline">
        Edit
      </Button>
    )}
    {isEditing && (
      <Button onClick={handleSaveClick} type="button" variant="underline">
        Save
      </Button>
    )}
  </div>
</div>

        <div className="grid grid-cols-1 gap-5 text-[1.3rem] font-[500] sm:grid-cols-2 md:grid-cols-3">
          <div>
            <label> Name</label>
            {isEditing ? (
              <input
                name="Name"
                value={editableUser?.Name || ''}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <h3 className="text-[1.1rem] font-[400]">{user?.Name}</h3>
            )}
          </div>
          <div>
            <label> Email</label>
            {isEditing ? (
              <input
                name="email"
                value={editableUser?.email || ''}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <h3 className="text-[1.1rem] font-[400]">{user?.email}</h3>
            )}
          </div>
          <div>
            <label> Last Login</label>
            {isEditing ? (
              <input
                name="last_login"
                value={editableUser?.last_login || ''}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <h3 className="text-[1.1rem] font-[400]">{user?.last_login}</h3>
            )}
          </div>
          <div>
            <label> Payment Plan</label>
            {isEditing ? (
              <input
                name="paymentPlan"
                value={editableUser?.paymentPlan || ''}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <h3 className="text-[1.1rem] font-[400]">{user?.paymentPlan}</h3>
            )}
          </div>
          <div>
            <label> Renew Date</label>
            {isEditing ? (
              <input
                name="renewDate"
                value={editableUser?.renewDate || ''}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <h3 className="text-[1.1rem] font-[400]">{user?.renewDate}</h3>
            )}
          </div>
          <div>
            <label> Status</label>
            <div className="flex items-center gap-3">
              {isEditing ? (
                <input
                  name="isActive"
                  type="checkbox"
                  checked={editableUser?.isActive === 'Y'}
                  onChange={(e) => setEditableUser(prev => ({ ...prev, isActive: e.target.checked ? 'Y' : 'N' }))}
                  className="h-4 w-4 accent-primary-500"
                />
              ) : (
                <input
                  onChange={handleChange}
                  checked={user.isActive === 'Y'}
                  id="active"
                  type="checkbox"
                  className="h-4 w-4 accent-primary-500"
                />
              )}
              <label htmlFor="active">Active</label>
              <Modal>
                <Modal.Open id="active-btn">
                  <button className="hidden" ref={ref}></button>
                </Modal.Open>
                <Modal.Window id="active-btn">
                  <UserConfirm
                    userId={userId}
                    isActive={user?.isActive === 'Y'}
                  />
                </Modal.Window>
              </Modal>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-10 flex flex-col rounded-xl bg-white px-8 py-10 shadow-lg">
        <h3 className="text-[1.7rem] font-[500] flex justify-start">User Results</h3>
        <PerformanceTable
          results={user?.resultList}
          isLoading={isLoading}
          dashboard={false}
          admin={true}
        />
      </section>
    </div>
  );
};

export default DisplayUserDetails;