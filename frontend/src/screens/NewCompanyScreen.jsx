import React, { useContext, useEffect, useState } from 'react'
import UniContainer from '../components/UniContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'

import axios from 'axios'
const API_URL = 'http://localhost:8000/api'

const CompanyDirScreen = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Add Company
  const newCompany = async (company_info) => {
    setLoading(true)
    setSuccess(false)
    try {
      await axios.post(`${API_URL}/companies/create/`, company_info)
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
      newCompany({
        name,
        description,
      })
      // Clear fields
      setName('')
      setDescription('')
    } else {
      setError('Por favor ingrese un nombre valido.')
    }
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
            Se agregó la empresa correctamente.&nbsp;Puede agregar otra empresa
            o puede <Link to={'/'}>regresar al directorio de empresas.</Link>
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

export default CompanyDirScreen
