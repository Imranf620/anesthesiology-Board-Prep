/*eslint-disable*/
import { forwardRef } from "react";
import Button from "./Button";

const ConfirmDelete = forwardRef(
  ({ onConfirm, onCloseModal, message, isLoading }, ref) => {
    return (
      <div className="flex flex-col gap-10">
        <h1 className="bg-primary-500 py-4 text-center text-[1.3rem] font-[700] uppercase tracking-wider text-primary-100">
          Are you sure?
        </h1>
        <p className="text-center font-[1rem]">{message}</p>
        <div className="mb-5 flex justify-end gap-3 px-4">
          <button
            disabled={isLoading}
            type="button"
            onClick={onCloseModal}
            ref={ref}
            className="rounded-md bg-primary-100 px-6 py-2 text-primary-500 outline-none"
          >
            Cancel
          </button>
          <Button
            onClick={onConfirm}
            variant="dark"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  },
);

export default ConfirmDelete;
