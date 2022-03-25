import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import UniContainer from '../components/UniContainer'
import EmployeeDetails from '../components/EmployeeDetails'

import { getEmployee } from '../api/ApiCalls'

const EmployeeDetailsScreen = () => {
  const [employee, setEmployee] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const params = useParams()

  // Get employee
  const getEmployeeInfo = async (id) => {
    setLoading(true)
    const [error, data] = await getEmployee(id)
    if (error) {
      setError(error)
    } else {
      setEmployee(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getEmployeeInfo(params.id)
  }, [params])

  return (
    <UniContainer>
      <Row className="mb-3">
        <Col>
          <h3>Detalles empleado</h3>
        </Col>
      </Row>
      <Row className="mb-3">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : Object.keys(employee).length === 0 ? (
          <Message variant="secondary">Unavailable</Message>
        ) : (
          <EmployeeDetails employee={employee} />
        )}
      </Row>
      <Row className="mt-3">
        <LinkContainer to={`/company/${employee.company}/`}>
          <Button>Regresar</Button>
        </LinkContainer>
      </Row>
    </UniContainer>
  )
}

export default EmployeeDetailsScreen
