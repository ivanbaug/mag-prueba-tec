import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import UniContainer from '../components/UniContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { getCompany, updateCompany } from '../api/ApiCalls'

const CompanyEditScreen = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const params = useParams()

  // Get company
  const getCompanyInfo = async (id) => {
    setLoading(true)
    const [error, data] = await getCompany(id)
    if (error) {
      setError(error)
    } else {
      setName(data.name)
      setDescription(data.description)
    }
    setLoading(false)
  }

  async function submitHandler(e) {
    e.preventDefault()
    if (name !== '') {
      setLoading(true)
      setSuccess(false)
      const [error, successUpdate] = await updateCompany(params.id, {
        name,
        description,
      })
      if (error) {
        setError(error)
      } else {
        setSuccess(successUpdate)
      }
      setLoading(false)
    } else {
      setError('Por favor ingrese un nombre valido.')
    }
  }

  useEffect(() => {
    getCompanyInfo(params.id)
  }, [params])

  return (
    <UniContainer>
      <Row className="mb-3">
        <Col>
          <h3>Editar empresa</h3>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && (
            <Message variant="danger">
              {error}&nbsp;
              <Link to="/">Regresar a la pagina de inicio.</Link>
            </Message>
          )}
          {success && (
            <Message variant="success">
              Cambios guardados. Puedes{' '}
              <Link to="/"> regresar a la pagina de inicio.</Link> o tambien
              puedes ver los{' '}
              <Link to={`/company/${params.id}`}> detalles de la empresa.</Link>{' '}
            </Message>
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
              <Form.Label className="mb-0">
                Descripcion de la empresa
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button type="submit" variant="primary" onClick={submitHandler}>
                Actualizar Datos
              </Button>
            </div>
          </Form>
        </>
      )}
    </UniContainer>
  )
}

export default CompanyEditScreen
