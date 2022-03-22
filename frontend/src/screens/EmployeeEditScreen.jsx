import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import UniContainer from '../components/UniContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

import axios from 'axios'
const API_URL = 'http://localhost:8000/api'

const EmployeeEditScreen = () => {
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const params = useParams()

  // Get employee
  const getEmployeeInfo = async (id) => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${API_URL}/employees/${id}/`)
      setName(data.name)
      setDepartment(data.department)
    } catch (error) {
      const e =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      setError(e)
    }
    setLoading(false)
  }

  // Update employee
  const updateEmployee = async (emp_info) => {
    setLoading(true)
    setSuccess(false)
    try {
      await axios.put(`${API_URL}/employees/update/${params.id}/`, emp_info)
      setSuccess(true)
    } catch (error) {
      const err =
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
      setError(err)
    }
    setLoading(false)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setError(null)
    if (name !== '') {
      updateEmployee({
        name,
        department,
      })
    } else {
      setError('Por favor ingrese un nombre valido.')
    }
  }

  useEffect(() => {
    getEmployeeInfo(params.id)
  }, [params])

  return (
    <UniContainer>
      <Row className="mb-3">
        <Col>
          <h3>Editar empleado</h3>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error}&nbsp;
          <Link to="/">Regresar a la pagina de inicio.</Link>
        </Message>
      ) : (
        success && (
          <Message variant="success">
            Cambios guardados. Puedes{' '}
            <Link to="/"> regresar a la pagina de inicio.</Link> o tambien puede
            ver los{' '}
            <Link to={`/employee/${params.id}`}> detalles del empleado.</Link>{' '}
          </Message>
        )
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label className="mb-0">Nombre del empleado</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ingrese nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label className="mb-0">Departamento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Departamento de la empresa a la que pertenece"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type="submit" variant="primary" onClick={submitHandler}>
            Enviar
          </Button>
        </div>
      </Form>
    </UniContainer>
  )
}

export default EmployeeEditScreen
