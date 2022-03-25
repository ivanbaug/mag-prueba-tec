import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import UniContainer from '../components/UniContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { getEmployee, updateEmployee } from '../api/ApiCalls'

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
    const [error, data] = await getEmployee(id)
    if (error) {
      setError(error)
    } else {
      setName(data.name)
      setDepartment(data.department)
    }
    setLoading(false)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    setError(null)
    if (name !== '') {
      setLoading(true)
      const [error, success] = await updateEmployee(params.id, {
        name,
        department,
      })
      if (error) {
        setError(error)
      } else {
        setSuccess(success)
      }
    } else {
      setError('Por favor ingrese un nombre valido.')
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
