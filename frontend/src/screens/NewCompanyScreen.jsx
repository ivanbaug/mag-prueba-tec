import React, { useContext, useEffect, useState } from 'react'
import UniContainer from '../components/UniContainer'
import Loader from '../components/Loader';
import Message from '../components/Message';
import BusinessContext from '../context/BusinessContext'
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CompanyDirScreen = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const { newCompany } = useContext(BusinessContext)

  const submitHandler = (e) => {
    e.preventDefault()
    newCompany({
      name,
      description,
    })
    navigate('/')
  }

  return (
    <UniContainer>
      <Row className='mb-3'>
        <Col>
          <h3>Añadir empresa</h3>
        </Col>
      </Row>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' className='mb-3'>
          <Form.Label className='mb-0'>
            Nombre de la empresa
          </Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Ingrese nombre'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='description' className='mb-3'>
          <Form.Label className='mb-0'>
            Descripcion de la empresa
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Ingrese desc'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type='submit' variant='primary' onClick={submitHandler} >Enviar</Button>
        </div>
      </Form>

    </UniContainer>
  )
}

export default CompanyDirScreen