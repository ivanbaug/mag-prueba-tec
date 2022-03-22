import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { BusinessProvider } from './context/BusinessContext'
import CompanyDirScreen from './screens/CompanyDirScreen'
import CompanyDetailsScreen from './screens/CompanyDetailsScreen'
import CompanyCreateScreen from './screens/CompanyCreateScreen'
import CompanyEditScreen from './screens/CompanyEditScreen'
import NotFoundScreen from './screens/NotFoundScreen'

function App() {
  return (
    <BusinessProvider>
      <Router>
        <Header />
        <main className="py-3">
          <Container className="cont-width">
            <Routes>
              <Route path="/" exact element={<CompanyDirScreen />} />
              <Route path="/new_company" element={<CompanyCreateScreen />} />
              <Route path="/emp/:id" element={<CompanyDetailsScreen />} />
              <Route path="/emp/:id/edit" element={<CompanyEditScreen />} />
              <Route path="/*" element={<NotFoundScreen />} />
              {/*         <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} /> */}
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </BusinessProvider>
  )
}

export default App
