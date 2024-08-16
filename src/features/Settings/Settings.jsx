import Avatar from '../../components/UI/Avatar';
import { useGetProfile } from '../Authentication/useGetProfile';
import ProfileForm from './ProfileForm';
import PasswordForm from './PasswordForm';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Settings = () => {
  const { profile } = useGetProfile();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const hidePerformance = sessionStorage.getItem('hidePerformance') === 'true';
    setIsChecked(hidePerformance);
  }, []);


  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    sessionStorage.setItem('hidePerformance', newCheckedState);
  };

  const hideComparativeStats = () => {
    
    sessionStorage.clear('hidePerformance')
  };

  const showComparativeStats = () => {
    // Add functionality to show comparative statistics
    sessionStorage.setItem('hidePerformance', true);
  };
 
  return (
    <div className="flex flex-col gap-10">
      <div className="relative flex justify-center">
        <div className="absolute left-0 top-0"></div>
        <Avatar modify={true} width="100px" height="100px" />
      </div>

      <div className="mx-auto w-[600px] max-w-[100%] rounded-md bg-white p-16 shadow-lg">
        <h4 className="mb-5 flex items-center gap-5 text-[1.3rem] font-[500] text-green-600">
          <span className="h-[10px] w-[10px] rounded-full bg-green-600"></span>
          <span>Active Plan</span>
        </h4>

        <h2 className="text-center text-[2rem] font-[600]">
          {profile?.paymentPlan}
        </h2>
        <div className="mt-4 text-end text-primary-500 underline">
          <Link to="/payment-plan">Choose another plan</Link>
        </div>
      </div>
      <ProfileForm profile={profile} />
      <PasswordForm />
      <div>
        <h1 className='mx-auto w-[600px] max-w-[100%] text-[1.3rem] font-[500] mb-4'>Performance</h1>
        <div className='w-[600px] max-w-full rounded-md bg-white p-8 shadow-lg mx-auto'>
      <section className='flex items-center mb-4'>
        <input 
          type="checkbox" 
          id="toggleStats" 
          checked={isChecked} 
          onChange={handleCheckboxChange} 
          className='mr-2'
        />
        <label htmlFor="toggleStats" className='text-gray-700 font-medium'>
          Hide Comparative Performance Statistics
        </label>
      </section>
      <h1 className='text-gray-600'>
        By checking the above box, national average comparisons on the dashboard 
        and test reviews will all be hidden by default. You can enable them individually 
        throughout the platform if needed.
      </h1>
    </div>
      </div>
    </div>
  );
};

export default Settings;
