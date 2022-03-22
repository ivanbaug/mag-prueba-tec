import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import UniContainer from '../components/UniContainer'
import EmployeeDetails from '../components/EmployeeDetails'

import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

const EmployeeDetailsScreen = () => {
  const [employee, setEmployee] = useState({})
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)

  const params = useParams()

  // Get employee
  const getEmployeeInfo = async (id) => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${API_URL}/employees/${id}/`)
      setEmployee(data)
    } catch (error) {
      const e =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      setError(e)
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
