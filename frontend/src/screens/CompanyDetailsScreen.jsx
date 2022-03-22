import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Button } from 'react-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import UniContainer from '../components/UniContainer'

import CompanyDetails from '../components/CompanyDetails'
import EmployeeList from '../components/EmployeeList'
import Paginate from '../components/Paginate'

import axios from 'axios'
const API_URL = 'http://localhost:8000/api'

const CompanyDetailsScreen = () => {
  const [company, setCompany] = useState({})
  const [employees, setEmployees] = useState({})
  const [loadingC, setLoadingC] = useState(false)
  const [loadingE, setLoadingE] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [pages, setPages] = useState(0)

  const params = useParams()
  const { search } = useLocation()
  const pageStr = search.includes('page') ? search.replace('?', '&') : ''

  // Get company
  const getCompanyInfo = async (id) => {
    setLoadingC(true)
    try {
      const { data } = await axios.get(`${API_URL}/companies/${id}`)
      setCompany(data)
    } catch (error) {
      const e =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      setError(e)
    }
    setLoadingC(false)
  }

  // Get employees
  const getEmployees = async (keywords = '') => {
    setLoadingE(true)
    try {
      const { data } = await axios.get(`${API_URL}/employees/${keywords}`)
      setEmployees(data.employees)
      setPage(data.page)
      setPages(data.pages)
    } catch (error) {
      const e =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      setError(e)
    }
    setLoadingE(false)
  }

  useEffect(() => {
    getCompanyInfo(params.id)
    getEmployees(`?company=${params.id}${pageStr}`)
  }, [pageStr, params])

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Esta seguro que desea retirar este empleado?')) {
        await axios.delete(`${API_URL}/employees/delete/${id}`)
        getEmployees(`?company=${params.id}`)
      }
    } catch (error) {
      alert(
        'There was an error trying to delete the employee, try again later.'
      )
    }
  }

  return (
    <UniContainer>
      <Row className="mb-3">
        <Col>
          <h3>Detalles empresa</h3>
        </Col>
      </Row>
      <Row className="mb-3">
        {loadingC ? (
          <Loader />
        ) : Object.keys(company).length === 0 ? (
          <Message variant="secondary">Unavailable</Message>
        ) : (
          <CompanyDetails company={company} />
        )}
      </Row>
      <Row className="mb-3 mt-5">
        <Col>
          <h3>Lista de personal</h3>
        </Col>
        <Col xs={4}>
          <LinkContainer to={`/company/${params.id}/new_employee`}>
            <Button>Nuevo empleado</Button>
          </LinkContainer>
        </Col>
      </Row>
      {loadingE || loadingC ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : employees.length > 0 ? (
        <>
          <EmployeeList employees={employees} onDelete={handleDelete} />
          <Paginate
            page={page}
            pages={pages}
            prefix={`/company/${params.id}`}
          />
        </>
      ) : (
        <Message variant="secondary">
          Aun no hay personas registradas, se el primero haciendo click en{' '}
          <b>"Nuevo empleado."</b>
        </Message>
      )}
    </UniContainer>
  )
}

export default CompanyDetailsScreen
