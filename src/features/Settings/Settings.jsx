import Avatar from '../../components/UI/Avatar';
import { useGetProfile } from '../Authentication/useGetProfile';
import ProfileForm from './ProfileForm';
import PasswordForm from './PasswordForm';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Settings = () => {
  const { profile } = useGetProfile();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isImageSaved, setIsImageSaved] = useState(false);

  useEffect(() => {
    const hidePerformance = sessionStorage.getItem('hidePerformance') === 'true';
    setIsChecked(hidePerformance);
  }, []);


  const handleSaveImage = () => {
    if (uploadedImage) {
      localStorage.setItem('avatarImage', uploadedImage);
      setIsImageSaved(true);
    }
  };

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    sessionStorage.setItem('hidePerformance', newCheckedState);
  };

  useEffect(() => {
    const storedImage = localStorage.getItem('avatarImage');
    if (storedImage) {
      setUploadedImage(storedImage);
    } else {
      setUploadedImage(profile?.avatarUrl);
    }
  }, [profile?.avatarUrl]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setUploadedImage(result);
        localStorage.setItem("avatarImage", result);
        onImageUpload(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col gap-10 items-center py-10 px-5">
      {/* User Info Box */}
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-[80%] sm:max-w-[600px] mx-auto">
  <div className="flex flex-col sm:flex-row justify-center sm:justify-start mb-6 sm:mb-8">
    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
      <Avatar
        width="40%" 
        height="40%" 
        sm="width: 50px; height: 50px;" 
        md="width: 800px; height: 800px;"
        src={uploadedImage || profile?.avatarUrl}
        className="border-4 border-gray-300 rounded-full"
      />
      <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="upload-avatar"
        />
        <label
          htmlFor="upload-avatar"
          className="cursor-pointer bg-primary-500 text-white py-1 sm:py-2 px-6 sm:px-8 rounded-lg shadow-lg hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 focus:outline-none text-sm sm:text-base"
        >
          Upload Image
        </label>
        <button
          onClick={handleSaveImage}
          className={`py-1 sm:py-2 px-6 sm:px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none text-sm sm:text-base ${
            isImageSaved ? 'bg-green-600' : 'bg-primary-500'
          } text-white hover:bg-opacity-90`}
        >
          {isImageSaved ? 'Image Saved' : 'Save Image'}
        </button>
      </div>
    </div>
  </div>

  <div className="space-y-3 sm:space-y-4">
    <div className="flex flex-col sm:flex-row justify-between text-gray-700">
      <span className="font-medium">Name:</span>
      <span>{profile?.Name}</span>
    </div>
    <div className="flex flex-col sm:flex-row justify-between text-gray-700">
      <span className="font-medium">Email:</span>
      <span>{profile?.email}</span>
    </div>
    <div className="flex flex-col sm:flex-row justify-between text-green-600">
      <span className="font-medium">Active Plan:</span>
      <span>{profile?.paymentPlan}</span>
    </div>
    <div className="text-right text-primary-500 underline mt-4 sm:mt-4">
      <Link to="/payment-plan">Choose another plan</Link>
    </div>
  </div>
</div>

      {/* Performance Section */}
      {/* <div className="mx-auto w-[600px] max-w-[100%] rounded-md bg-white p-16 shadow-lg">
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
      </div> */}

      <ProfileForm profile={profile} />
      <PasswordForm />

      <div className="w-[600px] max-w-full rounded-md bg-white p-8 shadow-lg mx-auto">
        <section className="flex items-center mb-4">
          <input
            type="checkbox"
            id="toggleStats"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="toggleStats" className="text-gray-700 font-medium">
            Hide Comparative Performance Statistics
          </label>
        </section>
        <p className="text-gray-600">
          By checking the above box, national average comparisons on the dashboard and test reviews will all be hidden by default. You can enable them individually throughout the platform if needed.
        </p>
      </div>
    </div>
  );
};

export default Settings;