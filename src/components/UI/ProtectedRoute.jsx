import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../features/Authentication/useUser';
import { useQueryClient } from '@tanstack/react-query';
import CryptoJS from 'crypto-js';
import { useGetProfile } from '../../features/Authentication/useGetProfile';
import FullPageLoading from './FullPageLoading';
import { useQuizContext } from '../../context/QuizContext';
import Modal from './Modal';
import WelcomePopup from './WelcomePopup';

const ProtectedRoute = ({ children, authPage = false, admin = false }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useUser();
  const queryClient = useQueryClient();
  const { state } = useQuizContext();
  const { profile, isLoading: isLoadingProfile } = useGetProfile();

  const isNew = localStorage.getItem('new');

  if (data === 'You are authorized!') {
    queryClient.fetchQuery({ queryKey: ['user-profile'] });
  }

  const isAuthenticated = data === 'You are authorized!';
// Show welcome message when user first sign in
  useEffect(() => {
    if (isNew) {
      setTimeout(() => {
        document.getElementById('welcome').click();
        localStorage.removeItem('new');
      }, 3000);
    }
  }, [isNew]);

  // Navigate on the basis of user if authenticated or not authenticated
  useEffect(() => {
    if (!localStorage.getItem('token') && !authPage) return navigate('/login');
    // If the data and profile is not loading
    if (!isLoading && !isLoadingProfile) {
      // if no authenticated and not authpage
      if (!isAuthenticated && !authPage) {
        return navigate('/login');
      }

      // If authenticated and authpage and profile
      if (isAuthenticated && authPage && profile) {
        // If role = admin navigate to admin
        if (profile.role === 'admin') {
          return navigate('/admin');
        } else {
          // if role = user navigate to app
          return navigate('/');
        }
      }
      // if authenticated and not authpage and profile and admin page
      if (isAuthenticated && !authPage && profile && admin) {
        // If role = admin return
        if (profile.role === 'admin') {
          return;
        } else {
          // If role = user navigate to app dashbaord
          return navigate('/');
        }
      }
      // if authenticated and not authpage and profile and not admin page
      if (isAuthenticated && !authPage && profile && !admin) {
        // if role = admin navigate to admin page
        if (profile.role === 'admin') {
          return navigate('/admin');
        } else {
          // if role = user return
          return;
        }
      }
    }
  }, [
    isAuthenticated,
    authPage,
    isLoading,
    profile,
    admin,
    navigate,
    isLoadingProfile,
  ]);

  // When in the middle of quiz user reload page store the state in localstorage
  useEffect(() => {
    const handleState = () => {
      // Encrypt the state than store it
      const encryptedState = CryptoJS.AES.encrypt(
        JSON.stringify(state),
        import.meta.env.VITE_SECRET_KEY,
      ).toString();
      localStorage.setItem('state', encryptedState);
    };
    window.addEventListener('beforeunload', handleState);
    return () => window.removeEventListener('beforeunload', () => handleState);
  }, [state]);

  // Integrate zoho when user login
  useEffect(() => {
    if (isAuthenticated) {
      const script = document.createElement('script');
      script.id = 'zoho-help';
      script.async = true;
      script.type = 'text/javascript';
      script.nonce = '3FgZYhUMB27Kg0qW';
      script.src =
        'https://desk.zoho.com/portal/api/web/inapp/991422000000329103?orgId=853322296';
      document.body.appendChild(script);
    }
    if (!isAuthenticated) {
      const el = document.getElementById('zoho-help');
      if (el) document.body.removeChild(el);
    }
  }, [isAuthenticated]);

  if (isLoading || isLoadingProfile) return <FullPageLoading />;

  // if authenticated and not authpage and not loading and adminpage and role is admin return childrens
  if (
    isAuthenticated &&
    !authPage &&
    !isLoading &&
    !isLoadingProfile &&
    admin &&
    profile.role === 'admin'
  )
    return children;

  // if authenticated and authpage and not laoding and not admin page and role = user return children
  if (
    isAuthenticated &&
    !authPage &&
    !isLoading &&
    !isLoadingProfile &&
    !admin &&
    profile.role !== 'admin'
  )
    return (
      <>
        {' '}
        {isNew && (
          <Modal>
            <Modal.Open id="wel-popup">
              <button id="welcome" className="hidden"></button>
            </Modal.Open>
            <Modal.Window center id="wel-popup">
              <WelcomePopup />
            </Modal.Window>
          </Modal>
        )}
        {children}
      </>
    );

  // If not authenticated and authpage and not loading return children
  if (!isAuthenticated && authPage && !isLoading && !isLoadingProfile)
    return children;

  return null;
};

export default ProtectedRoute;
