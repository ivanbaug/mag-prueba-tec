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

import { deleteEmployee, getCompany, getEmployees } from '../api/ApiCalls'

const CompanyDetailsScreen = () => {
  const [employeesSt, setEmployeesSt] = useState({
    employees: [],
    pages: 0,
    page: 0,
  })
  const [company, setCompany] = useState({})
  const [loadingC, setLoadingC] = useState(false)
  const [loadingE, setLoadingE] = useState(false)
  const [error, setError] = useState(null)

  const params = useParams()
  const { employees, pages, page } = employeesSt

  const { search } = useLocation()
  const pageStr = search.includes('page') ? search.replace('?', '&') : ''

  // Get company info
  const getCompanyInfo = async ({ id, keywords }) => {
    // Company displays first
    setLoadingC(true)
    const [errorCompany, data] = await getCompany(id)
    if (errorCompany) {
      setError(errorCompany)
    } else {
      setCompany(data)
    }
    setLoadingC(false)
    // Display employees
    setLoadingE(true)
    const [errorEmployees, dataEmp] = await getEmployees(keywords)
    if (errorEmployees) {
      setError(errorEmployees)
    } else {
      setEmployeesSt(dataEmp)
    }
    setLoadingE(false)
  }

  const deleteHandler = async (id) => {
    if (window.confirm('Esta seguro que desea retirar este empleado?')) {
      const [errorDelete, success] = await deleteEmployee(id)
      if (errorDelete) {
        alert(errorDelete)
      }
      if (success) {
        // If successfull refresh data
        await getCompanyInfo({
          id: params.id,
          keywords: `?company=${params.id}${pageStr}`,
        })
      }
    }
  }

  useEffect(() => {
    getCompanyInfo({
      id: params.id,
      keywords: `?company=${params.id}${pageStr}`,
    })
  }, [pageStr, params])

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
          <EmployeeList employees={employees} onDelete={deleteHandler} />
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
