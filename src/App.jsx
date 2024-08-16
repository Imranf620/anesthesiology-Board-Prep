import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import LogRocket from 'logrocket';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import FullPageLoading from './components/UI/FullPageLoading';
import Providers from './providers/Providers';

// Layouts
const MainLayout = lazy(() => import('./components/Layouts/MainLayout'));
const QuizLayout = lazy(() => import('./components/Layouts/QuizLayout'));
const AdminLayout = lazy(() => import('./components/Layouts/AdminLayout'));

// Protected Route
const ProtectedRoute = lazy(() => import('./components/UI/ProtectedRoute'));

// Auth Pages
const LoginPage = lazy(() => import('./pages/AuthPages/LoginPage'));
const SignupPage = lazy(() => import('./pages/AuthPages/SignupPage'));

// User Pages
const DashboardPage = lazy(() => import('./pages/UserPages/DashboardPage'));
const CreateTestPage = lazy(() => import('./pages/UserPages/CreateTestPage'));
const SearchQuestionPage = lazy(
  () => import('./pages/UserPages/SearchQuestionPage'),
);
const TakeQuizPage = lazy(() => import('./pages/UserPages/TakeQuizPage'));
const PerformancePage = lazy(() => import('./pages/UserPages/PerformancePage'));
const NotesPage = lazy(() => import('./pages/UserPages/NotesPage'));
const QuizResultPage = lazy(() => import('./pages/UserPages/QuizResultPage'));
const PaymentPlanPage = lazy(() => import('./pages/UserPages/PaymentPlanPage'));
const SettingsPage = lazy(() => import('./pages/UserPages/SettingsPage'));
const CheckoutPage = lazy(() => import('./pages/UserPages/CheckoutPage'));

// Admin Pages
const ManageUsersPage = lazy(
  () => import('./pages/AdminPages/ManageUsersPage'),
);
const ManageDatabasePage = lazy(
  () => import('./pages/AdminPages/ManageDatabasePage'),
);
const ManageFeedbackPage = lazy(
  () => import('./pages/AdminPages/ManageFeedbackPage.jsx'),
);
const AddQuestionPage = lazy(
  () => import('./pages/AdminPages/AddQuestionPage'),
);
const DisplayUserDetailsPage = lazy(
  () => import('./pages/AdminPages/DisplayUserDetailsPage'),
);
const AddQuestionsFilePage = lazy(
  () => import('./pages/AdminPages/AddQuestionsFilePage'),
);
const ManagePaymentPlansPage = lazy(
  () => import('./pages/AdminPages/ManagePaymentPlansPage'),
);
const EditQuestionPage = lazy(
  () => import('./pages/AdminPages/EditQuestionPage'),
);
const LogsPage = lazy(() => import('./pages/AdminPages/LogsPage'));
const FinancialsPage = lazy(() => import('./pages/AdminPages/FinancialsPage'));

// Not found Page
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App = () => {
  // Initialize LogRocket
  LogRocket.init('rhtdvm/test-web');

  return (
    <BrowserRouter>
      {/* Wrap the entire app in a Suspense component to handle lazy loading */}

      <Suspense fallback={<FullPageLoading />}>
        <Providers>
          <ToastContainer
            position="top-center"
            hideProgressBar={true}
            newestOnTop={true}
            autoClose={false}
            pauseOnFocusLoss={false}
            role="alert"
            theme="light"
            className="mx-auto mt-4 flex w-[90%] max-w-[500px] flex-col items-center gap-3 px-3 sm:mt-0 sm:w-max sm:min-w-[300px] sm:gap-0 sm:px-0 md:w-[200px]"
            toastClassName="text-primary-500 gap-2"
          />
          <Routes>
            {/* User Layout and routes */}
            <Route
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                </Suspense>
              }
            >
              <Route path="/" index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="create-test" element={<CreateTestPage />} />
              <Route path="question-search" element={<SearchQuestionPage />} />
              <Route path="performance" element={<PerformancePage />} />
              <Route path="notes" element={<NotesPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            {/* User Quiz Layout and routes */}
            <Route
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <ProtectedRoute>
                    <QuizLayout />
                  </ProtectedRoute>
                </Suspense>
              }
            >
              <Route path="take-quiz" element={<TakeQuizPage />} />
              <Route path="quiz-result" element={<QuizResultPage />} />
            </Route>

            {/* Admin layout and routes */}
            <Route
              path="admin"
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <ProtectedRoute admin={true}>
                    <AdminLayout />
                  </ProtectedRoute>
                </Suspense>
              }
            >
              <Route path="/admin" element={<Navigate to="manage-users" />} />
              <Route path="manage-users" element={<ManageUsersPage />} />
              <Route
                path="manage-users/user/:userId"
                element={<DisplayUserDetailsPage />}
              />
              <Route path="manage-database" element={<ManageDatabasePage />} />
              <Route path="manage-feedback" element={<ManageFeedbackPage />} />
              <Route
                path="manage-database/add-question"
                element={<AddQuestionPage />}
              />
              <Route
                path="manage-database/edit-question/:questionId"
                element={<EditQuestionPage />}
              />
              <Route
                path="manage-database/add-file"
                element={<AddQuestionsFilePage />}
              />
              <Route
                path="manage-payments"
                element={<ManagePaymentPlansPage />}
              />
              <Route path="logs" element={<LogsPage />} />
              <Route path="financials" element={<FinancialsPage />} />
            </Route>

            {/* Payment Plan & Checkoute route */}
            <Route path="payment-plan" element={<PaymentPlanPage />} />
            <Route
              path="payment-plan/:plan/checkout"
              element={<CheckoutPage />}
            />

            {/* Auth routes */}
            <Route
              path="login"
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <ProtectedRoute authPage={true}>
                    <LoginPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            <Route
              path="signup"
              element={
                <Suspense fallback={<FullPageLoading />}>
                  <ProtectedRoute authPage={true}>
                    <SignupPage />
                  </ProtectedRoute>
                </Suspense>
              }
            />
            {/* Not found route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Providers>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
