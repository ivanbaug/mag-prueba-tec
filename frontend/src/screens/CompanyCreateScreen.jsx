import React, { useState } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UniContainer from '../components/UniContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { newCompany } from '../api/ApiCalls'

const CompanyCreateScreen = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setError(null) //Got to clear error before adding a new one
    if (name !== '') {
      const [error, created] = await newCompany({
        name,
        description,
      })
      if (error) {
        setError(error)
      } else {
        setSuccess(created)
      }
      // Clear fields
      setName('')
      setDescription('')
    } else {
      setError('Por favor ingrese un nombre valido.')
    }
    setLoading(false)
  }

  return (
    <UniContainer>
      <Row className="mb-3">
        <Col>
          <h3>Añadir empresa</h3>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        success && (
          <Message variant="success">
            Se agregó la empresa correctamente.&nbsp;Puedes agregar otra empresa
            o puedes <Link to={'/'}>regresar al directorio de empresas.</Link>
          </Message>
        )
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label className="mb-0">Nombre de la empresa</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Ingrese nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label className="mb-0">Descripcion de la empresa</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default CompanyCreateScreen
