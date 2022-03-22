import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Button } from 'react-bootstrap'
import UniContainer from '../components/UniContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import CompanyList from '../components/CompanyList'
import Paginate from '../components/Paginate'

import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

const CompanyDirScreen = () => {
  const [companies, setCompanies] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(0)

  const { search: keywords } = useLocation()

  useEffect(() => {
    getCompanies(keywords)
  }, [keywords])

  // Get companies
  const getCompanies = async (keywords = '') => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${API_URL}/companies/${keywords}`)
      setCompanies(data.companies)
      setPage(data.page)
      setPages(data.pages)
    } catch (error) {
      const e =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      setError(e)
    }
    setLoading(false)
  }

  // Delete single company
  const deleteCompany = async (id) => {
    try {
      if (
        window.confirm(
          'Esta seguro que desea eliminar esta empresa? Tenga en cuenta que tambien se perderan los datos de todos sus empleados.'
        )
      ) {
        await axios.delete(`${API_URL}/companies/delete/${id}`)
        getCompanies()
      }
    } catch (error) {
      alert('There was an error trying to delete the company, try again later.')
    }
  }

  return (
    <UniContainer>
      <Row className="mb-3">
        <Col>
          <h3>Directorio de empresas</h3>
        </Col>
        <Col xs={3}>
          <LinkContainer to="/new_company">
            <Button>Nueva empresa</Button>
          </LinkContainer>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : companies.length === 0 ? (
        <Message variant="secondary">
          Aun no hay empresas registradas, se el primero haciendo click en{' '}
          <b>"Añadir empresa"</b>
        </Message>
      ) : (
        <>
          <CompanyList companies={companies} handleDelete={deleteCompany} />
          <Paginate page={page} pages={pages} prefix="/" />
        </>
      )}
    </UniContainer>
  )
}

export default CompanyDirScreen
