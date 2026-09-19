import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { AuthProvider } from './features/auth/AuthContext';
import { LoginPage } from './features/auth/LoginPage';
import { RequireAuth } from './features/auth/RequireAuth';
import { AlliancePage } from './features/alliance/AlliancePage';
import { GuidePage } from './features/guide/GuidePage';
import { ProfilePage } from './features/profile/ProfilePage';
import { ServerPage } from './features/server/ServerPage';
import { StatisticsPage } from './features/statistics/StatisticsPage';
import { trpc, trpcClient } from './lib/api/trpcClient';

const queryClient = new QueryClient();

function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <AppLayout />
                  </RequireAuth>
                }
              >
                <Route index element={<Navigate to="/profile" replace />} />
                <Route path="profile/*" element={<ProfilePage />} />
                <Route path="guide/*" element={<GuidePage />} />
                <Route path="server/*" element={<ServerPage />} />
                <Route path="alliance/*" element={<AlliancePage />} />
                <Route path="stats/*" element={<StatisticsPage />} />
                <Route path="*" element={<Navigate to="/profile" replace />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
