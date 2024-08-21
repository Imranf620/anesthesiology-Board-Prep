// components/UI/CreateTestButton.jsx
import React from 'react';
import Button from './Button';

const CreateTestButton = ({ onClick, disabled }) => {
  return (
    <Button
      disabled={disabled}
      type="button"
      variant="dark"
      className="text-[1rem] w-max"
      onClick={onClick}
    >
      Create Test
    </Button>
  );
};

export default CreateTestButton;
