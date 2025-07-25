import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '@/components/LoginPage'
import Dashboard from '@/components/Dashboard'
import ProtectedRoute from '@/components/ProtectedRoute'
import ProspectsPage from '@/components/pages/ProspectsPage'
import ReportsPage from '@/components/pages/ReportsPage'
import LeadsPage from '@/components/pages/LeadsPage'
import SettingsPage from '@/components/pages/SettingsPage'

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública de login */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rotas protegidas */}
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/prospects" element={
          <ProtectedRoute>
            <ProspectsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/reports" element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/leads" element={
          <ProtectedRoute>
            <LeadsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
        
        {/* Rota padrão - redireciona para dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
