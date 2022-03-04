import React, { useContext, useEffect, useState } from 'react'
import UniContainer from '../components/UniContainer'
import Message from '../components/Message';
import BusinessContext from '../context/BusinessContext'
import { Row, Col, Button, Form, Card, ListGroup, Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { LinkContainer } from 'react-router-bootstrap'

const CompanyDetails = () => {

  // const [name, setName] = useState('')
  // const [description, setDescription] = useState('')

  const navigate = useNavigate()
  const params = useParams()

  const { curCompany, getOneCompany, isLoading, getEmployees, employees } = useContext(BusinessContext)


  useEffect(() => {
    if (Object.keys(curCompany).length === 0) {
      getOneCompany(params.id)
      getEmployees(`?company=${params.id}`)
    }
    else if (Number(curCompany.id) !== Number(params.id)) {
      getOneCompany(params.id)
      getEmployees(`?company=${params.id}`)
    }

  }, [curCompany, getOneCompany, params])

  const handleDelete = async (id) => {
    // if (window.confirm('Esta seguro que desea eliminar esta empresa? Tenga en cuenta que tambien se perderan todos sus empleados.')) {
    //   await deleteCompany(id)
    // }
    // getCompanies()
  }

  return (
    <UniContainer>
      <Row className='mb-3'>
        <Col>
          <h3>Detalles empresa</h3>
        </Col>
      </Row>

      <Row className='mb-3'>
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
      </Row>

      <Row className='mb-3 mt-5'>
        <Col>
          <h3>Empleados de la empresa</h3>
        </Col>
        <Col xs={4}>
          <LinkContainer to='/new_company'>
            <Button>Nuevo empleado</Button>
          </LinkContainer>
        </Col>
      </Row>
      {
        isLoading ? <Loader />
          : (employees.employees.length === 0)
            ? <Message variant='secondary'>
              Aun no hay empresas registradas, se el primero haciendo click en <b>"Añadir empresa"</b>
            </Message>
            : (
              <Table striped hover responsive >
                <thead>
                  <th >Nombre</th>
                  <th className="text-center" >Depto</th>
                  <th></th>

                </thead>
                <tbody>
                  {employees.employees.map((c) =>
                  (<tr key={c.id}>
                    <td className="align-middle">{c.name}</td>
                    <td className="align-middle text-center">{c.department}</td>
                    <td className="text-center">
                      <LinkContainer to={`/emp/${c.id}/edit`}>
                        <Button className='me-2'><i className="fas fa-edit"></i></Button>
                      </LinkContainer>
                      <LinkContainer to={`/emp/${c.id}`}>
                        <Button variant='success' className='me-2'><i className="fas fa-search"></i></Button>
                      </LinkContainer>
                      <Button variant='danger' onClick={() => handleDelete(c.id)} ><i className="fas fa-trash"></i></Button>
                    </td>

                  </tr>
                  )
                  )}
                </tbody>
              </Table>
            )
      }

    </UniContainer>
  )
}

export default CompanyDetails

