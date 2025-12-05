import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Pages
import LandingPage from '@/pages/Landing/LandingPage';
import LoginPage from '@/pages/Auth/LoginPage';
import SignupPage from '@/pages/Auth/SignupPage';
import UserDashboardPage from '@/pages/Dashboard/UserDashboardPage';
import NewConsultationPage from '@/pages/Consultation/NewConsultationPage';
import ConsultationResultPage from '@/pages/Consultation/ConsultationResultPage';
import ConsultationHistoryPage from '@/pages/Consultation/ConsultationHistoryPage';
import AdminDashboardPage from '@/pages/Admin/AdminDashboardPage';
import SymptomsManagementPage from '@/pages/Admin/SymptomsManagementPage';
import DiseasesManagementPage from '@/pages/Admin/DiseasesManagementPage';
import TreatmentsManagementPage from '@/pages/Admin/TreatmentsManagementPage';
import UsersManagementPage from '@/pages/Admin/UsersManagementPage';
import ConsultationsManagementPage from '@/pages/Admin/ConsultationsManagementPage';
import KnowledgeBasePage from '@/pages/KnowledgeBase/KnowledgeBasePage';
import DoctorDashboardPage from '@/pages/Doctor/DoctorDashboardPage';
import NotFound from '@/pages/NotFound';

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/knowledge-base" element={<KnowledgeBasePage />} />

      {/* Patient Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <UserDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consultation/new"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <NewConsultationPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consultation/history"
        element={
          <ProtectedRoute allowedRoles={['patient']}>
            <ConsultationHistoryPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/consultation/:id"
        element={
          <ProtectedRoute allowedRoles={['patient', 'admin', 'doctor']}>
            <ConsultationResultPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/symptoms"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <SymptomsManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/diseases"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DiseasesManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/treatments"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <TreatmentsManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <UsersManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/consultations"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ConsultationsManagementPage />
          </ProtectedRoute>
        }
      />

      {/* Doctor Routes */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorDashboardPage />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
