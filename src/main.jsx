import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './page/Login'
import Dashboard from './page/Dashboard'
import Torneos from './page/Torneos'
import Inscripciones from './page/Inscripciones'
import Tiempos from './page/Tiempos'
import Resultados from './page/Resultados'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="torneos" element={<Torneos />} />
          <Route path="inscripciones" element={<Inscripciones />} />
          <Route path="tiempos" element={<Tiempos />} />
          <Route path="resultados" element={<Resultados />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
