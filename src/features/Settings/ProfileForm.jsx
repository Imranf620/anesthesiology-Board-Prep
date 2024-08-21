import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { updateProfile } from '../../services/apiUsers';

const ProfileForm = ({ profile }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: profile?.Name || '',
      email: profile?.email || '',
    },
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imageData, setImageData] = useState(profile?.image || '');

  const onSubmit = async (data) => {
    try {
      const payload = {
        username: localStorage.getItem('username'),
        new_email: data.email,
        new_name: data.name,
        image_data: imageData, // Ensure this is the base64 string
      };
  
      console.log('Submitting payload:', payload);
  
      await updateProfile(payload);
  
      setSuccess('Profile updated successfully!');
      setError(null);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(`Failed to update profile. Please try again. ${err.message}`);
      setSuccess(null);
    }
  };
  

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData(reader.result); // Set base64 string
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };
  return (
    <div className="mx-auto w-[700px] max-w-[100%] rounded-xl bg-white p-12 shadow-2xl transition-transform duration-500 transform hover:scale-105">
      <h4 className="mb-8 text-2xl font-semibold">Change Settings</h4>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Input register={register} id="name" label="Name" type="text" />
        <Input register={register} id="email" type="email" label="Email" />
        <div>
          <label htmlFor="image">Profile Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="dark" className="mt-5">
            Change Settings
          </Button>
        </div>
        {success && <p className="text-green-600 mt-4">{success}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default ProfileForm;
