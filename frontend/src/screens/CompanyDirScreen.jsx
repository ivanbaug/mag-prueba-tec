import React, { useContext, useEffect } from 'react'
import UniContainer from '../components/UniContainer'
import Loader from '../components/Loader';
import Message from '../components/Message';
import BusinessContext from '../context/BusinessContext'
import { Row, Col, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'


const CompanyDirScreen = () => {
  const {
    isLoading,
    companies,
    getCompanies,
    deleteCompany,
  } = useContext(BusinessContext)

  useEffect(() => {
    getCompanies()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm('Esta seguro que desea eliminar esta empresa? Tenga en cuenta que tambien se perderan todos sus empleados.')) {
      await deleteCompany(id)
    }
    getCompanies()
  }

  return (
    <UniContainer>
      <Row className='mb-3'>
        <Col>
          <h3>Directorio de empresas</h3>
        </Col>
        <Col xs={3}>
          <LinkContainer to='/new_company'>
            <Button>Nueva empresa</Button>
          </LinkContainer>
        </Col>
      </Row>

      {
        isLoading ? <Loader />
          : (companies.companies.length === 0)
            ? <Message variant='secondary'>
              Aun no hay empresas registradas, se el primero haciendo click en <b>"Añadir empresa"</b>
            </Message>
            : (
              <Table striped hover responsive >
                <thead>
                  <th >Nombre</th>
                  <th className="text-center" ># Empleados</th>
                  <th></th>

                </thead>
                <tbody>
                  {companies.companies.map((c) =>
                  (<tr key={c.id}>
                    <td className="align-middle">{c.name}</td>
                    <td className="align-middle text-center">{c.num_employees}</td>
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

export default CompanyDirScreen