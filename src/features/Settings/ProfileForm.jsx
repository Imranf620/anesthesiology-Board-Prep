import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import { updateProfile } from '../../services/apiUsers'; // Adjust the path as needed

const ProfileForm = ({ profile }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: profile?.Name || '',
      email: profile?.email || '',
    },
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await updateProfile({
        username: profile?.username, 
        new_email: data.email,
        new_name: data.name,
      });
      setSuccess('Profile updated successfully!');
      console.log('Response:', response);
      setError(null);
    } catch (err) {
      console.error('Error:', err.message);
      setError(`Failed to update profile. Please try again. ${err.message}`);
      setSuccess(null);
    }
  };

  return (
    <div className="mx-auto w-[600px] max-w-[100%] rounded-md bg-white p-16 shadow-lg">
      <h4 className="mb-8 text-[1.3rem] font-[500]">Change Settings</h4>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <Input register={register} id="name" label="Name" type="text" />
        <Input register={register} id="email" type="email" label="Email" />
        <div className="flex justify-end">
          <Button type="submit" variant="dark" className="mt-5">
            Change Settings
          </Button>
        </div>
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default ProfileForm;
