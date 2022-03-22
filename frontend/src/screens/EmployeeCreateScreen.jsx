import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import UniContainer from '../components/UniContainer'

import axios from 'axios'
const API_URL = 'http://localhost:8000/api'

const EmployeeCreateScreen = () => {
  const [name, setName] = useState('')
  const [department, setDepartment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const params = useParams()

  // Add Company
  const newEmployee = async (company_info) => {
    setLoading(true)
    setSuccess(false)
    try {
      await axios.post(`${API_URL}/employees/create/`, company_info)
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
      newEmployee({
        name,
        department,
        company: params.id,
      })
      // Clear fields
      setName('')
      setDepartment('')
    } else {
      setError('Por favor ingrese un nombre valido.')
    }
  }

  return (
    <UniContainer>
      <Row className="mb-3">
        <Col>
          <h3>Añadir empleado</h3>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        success && (
          <Message variant="success">
            Se agregó el empleado correctamente.&nbsp;Puede agregar otro
            empleado o puede{' '}
            <Link to={`/company/${params.id}`}>
              regresar a detalles de la empresa.
            </Link>
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

export default EmployeeCreateScreen
