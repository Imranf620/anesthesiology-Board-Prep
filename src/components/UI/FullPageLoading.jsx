import { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

const FullPageLoading = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => (document.body.style.overflow = 'visible');
  }, []);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <LoadingSpinner />
    </div>
  );
};

export default FullPageLoading;
