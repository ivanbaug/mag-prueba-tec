import { Container } from 'react-bootstrap'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import CompanyDirScreen from './screens/CompanyDirScreen'
import CompanyDetailsScreen from './screens/CompanyDetailsScreen'
import CompanyCreateScreen from './screens/CompanyCreateScreen'
import CompanyEditScreen from './screens/CompanyEditScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import EmployeeCreateScreen from './screens/EmployeeCreateScreen'
import EmployeeDetailsScreen from './screens/EmployeeDetailsScreen'
import EmployeeEditScreen from './screens/EmployeeEditScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container className="cont-width">
          <Routes>
            <Route path="/" exact element={<CompanyDirScreen />} />
            <Route path="/new_company" element={<CompanyCreateScreen />} />
            <Route path="/company/:id" element={<CompanyDetailsScreen />} />
            <Route path="/company/:id/edit" element={<CompanyEditScreen />} />
            <Route
              path="/company/:id/new_employee"
              element={<EmployeeCreateScreen />}
            />
            <Route path="/employee/:id" element={<EmployeeDetailsScreen />} />
            <Route path="/employee/:id/edit" element={<EmployeeEditScreen />} />
            <Route path="/*" element={<NotFoundScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
