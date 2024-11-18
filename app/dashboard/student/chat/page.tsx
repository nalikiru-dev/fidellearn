import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';
import Chat from '@/components/app-chat-page';

export default function StudentChatPage() {
  return (
    <ProtectedRoute allowedRoles={['student']}>
        <Chat />
    </ProtectedRoute>
  );
}
