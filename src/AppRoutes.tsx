import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ChatPage } from './pages/ChatPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { ITSMManagementPage } from './pages/ITSMManagementPage';
import { WorkFlowManagementPage } from './pages/WorkFlowManagementPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/users" element={<UserManagementPage />} />
      <Route path="/itsm" element={<ITSMManagementPage />} />
      <Route path="/workflow" element={<WorkFlowManagementPage />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}