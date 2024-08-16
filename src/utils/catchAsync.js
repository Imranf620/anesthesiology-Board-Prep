export const catchAsync = fn => {
  return (...args) =>
    fn(...args).catch(err => {
      throw new Error(
        err?.response?.data?.message ||
          err?.response?.data?.Error ||
          err?.response?.data?.error ||
          err?.message,
      );
    });
};
