import { useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { useGetProfile } from '../../features/Authentication/useGetProfile';

const Avatar = ({
  modify,
  className = '',
  width = '40px',
  height = '40px',
}) => {
  const { profile } = useGetProfile();
  const [avatar, setAvatar] = useState(profile.image);

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Update avatar state with the new image
        // You may want to send this image to the server or store it in local storage
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`relative w-[${width}] h-[${height}] overflow-hidden rounded-full ${className}`}
    >
      <img
        src={avatar}
        alt="User Image"
        className="h-full w-full object-cover"
        style={{ objectFit: 'cover' }} // Ensure the image covers the container
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleAvatarChange}
        id="avatar-upload"
      />
      {modify && (
        <>
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => document.getElementById('avatar-upload').click()}
          ></div>
          <div className="absolute bottom-1 right-1 flex items-center justify-center w-8 h-8 text-white bg-green-500 rounded-full shadow-md">
            <BiPencil size={20} />
          </div>
        </>
      )}
    </div>
  );
};

export default Avatar;
