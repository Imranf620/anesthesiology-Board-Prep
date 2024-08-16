import { HiArrowLeft } from 'react-icons/hi2';
import Button from '../../../components/UI/Button';
import Heading from '../../../components/UI/Heading';
import { useGetUsers } from './useGetUsers';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../components/UI/Avatar';
import PerformanceTable from '../../Performance/PerformanceTable';
import { useRef } from 'react';
import Modal from '../../../components/UI/Modal';
import ConfirmDelete from '../../../components/UI/ConfirmDelete';
import UserConfirm from './UserConfirm';

const DisplayUserDetails = ({ userId }) => {
  const { users, isLoading } = useGetUsers();
  const navigate = useNavigate();
  const ref = useRef();
  let user;
  if (users) {
    user = users.usersList.find(usr => usr.username === userId);
  }

  const handleChange = e => {
    ref.current.click();
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
        <h3 className="text-center text-[1.7rem] font-[500]">
          User Information
        </h3>
        <div className="grid grid-cols-1 gap-5 text-[1.3rem] font-[500] sm:grid-cols-2 md:grid-cols-3">
          <div>
            <label> Name</label>
            <h3 className="text-[1.1rem] font-[400]">{user?.Name}</h3>
          </div>
          <div>
            <label> Email</label>
            <h3 className="text-[1.1rem] font-[400]">{user?.email}</h3>
          </div>
          <div>
            <label> Last Login</label>
            <h3 className="text-[1.1rem] font-[400]">{user?.last_login}</h3>
          </div>
          <div>
            <label> Payment Plan</label>
            <h3 className="text-[1.1rem] font-[400]">{user?.paymentPlan}</h3>
          </div>
          <div>
            <label> Renew Date</label>
            <h3 className="text-[1.1rem] font-[400]">{user?.renewDate}</h3>
          </div>
          <div>
            <label> Status</label>
            <div className="flex items-center gap-3">
              <input
                onChange={handleChange}
                checked={user?.isActive === 'Y'}
                id="active"
                type="checkbox"
                className="h-4 w-4 accent-primary-500"
              />
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
        <h3 className="text-center text-[1.7rem] font-[500]">User Results</h3>
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
