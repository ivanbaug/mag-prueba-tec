import { Container } from 'react-bootstrap';
import { HashRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import { BusinessProvider } from './context/BusinessContext';
import CompanyDirScreen from './screens/CompanyDirScreen';
import CompanyDetailsScreen from './screens/CompanyDetailsScreen';
import NewCompanyScreen from './screens/NewCompanyScreen'
import EditCompanyScreen from './screens/EditCompanyScreen';

function App() {
  return (
    <BusinessProvider>
      <HashRouter>
        <Header />
        <main className='py-3'>
          <Container className='cont-width'>
            <Routes>
              <Route path='/' exact element={<CompanyDirScreen />} />
              <Route path='/new_company' element={<NewCompanyScreen />} />
              <Route path='/emp/:id' element={<CompanyDetailsScreen />} />
              <Route path='/emp/:id/edit' element={<EditCompanyScreen />} />
              {/*         <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} /> */}
            </Routes>
          </Container>
        </main>
        <Footer />
      </HashRouter>
    </BusinessProvider>

  );
}

export default App;
