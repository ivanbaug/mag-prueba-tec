import React, { useContext, useEffect, useState } from 'react'
import UniContainer from '../components/UniContainer'
import Message from '../components/Message'
import BusinessContext from '../context/BusinessContext'
import { Row, Col, Button, Form, Card, ListGroup } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'

const CompanyEditScreen = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const navigate = useNavigate()
  const params = useParams()

  const { curCompany, getOneCompany, isLoading, updateCompany } =
    useContext(BusinessContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    await updateCompany(
      {
        name,
        description,
      },
      params.id
    )
    navigate('/')
  }

  useEffect(() => {
    if (Object.keys(curCompany).length === 0) {
      getOneCompany(params.id)
    } else if (Number(curCompany.id) !== Number(params.id)) {
      getOneCompany(params.id)
    }
    if (!isLoading) {
      setName(curCompany.name)
      setDescription(curCompany.description)
    }
  }, [curCompany, getOneCompany, params])

  return (
    <UniContainer>
      <Row className="mb-3">
        <Col>
          <h3>Detalles empresa</h3>
        </Col>
      </Row>

      {/* <Row className='mb-3'>
        {
          isLoading ? <Loader />
            : (Object.keys(curCompany).length === 0)
              ? <Message variant='secondary'>Unavailable</Message>
              : <Card>
                <Card.Header as="h3">{curCompany.name}</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Descripcion:</strong>&nbsp;
                    {curCompany.description}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Empleados:</strong>&nbsp;
                    {curCompany.num_employees}
                  </ListGroup.Item>
                </ListGroup>
              </Card>

        }
      </Row> */}
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
            Actualizar Datos
          </Button>
        </div>
      </Form>
    </UniContainer>
  )
}

export default CompanyEditScreen
