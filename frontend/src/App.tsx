import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Dashboard } from './pages/dashboard'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { ProtectedRoute } from './components/ui/ProtectedRoute'
import { PublicRoute } from './components/ui/PublicRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
