import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Button } from 'react-bootstrap'
import UniContainer from '../components/UniContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import CompanyList from '../components/CompanyList'
import Paginate from '../components/Paginate'

import { getCompanies, deleteCompany } from '../api/ApiCalls'

const CompanyDirScreen = () => {
  const [companiesSt, setCompaniesSt] = useState({
    companies: [],
    pages: 0,
    page: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { companies, pages, page } = companiesSt
  const { search: keywords } = useLocation()

  useEffect(() => {
    callGetCompanies(keywords)
  }, [keywords])

  // Get companies
  const callGetCompanies = async (keywords) => {
    setLoading(true)
    const [error, data] = await getCompanies(keywords)
    if (error) {
      setError(error)
    } else {
      setCompaniesSt(data)
    }
    setLoading(false)
  }

  // Delete single company
  const deleteHandler = async (id) => {
    if (
      window.confirm(`Esta seguro que desea eliminar esta empresa?
Tenga en cuenta que tambien se perderan los datos de todos sus empleados.`)
    ) {
      setLoading(true)
      const [error, data] = await deleteCompany(id, keywords)
      if (error) {
        alert(error)
      } else {
        setCompaniesSt(data)
      }
      setLoading(false)
    }
  }

  return (
    <UniContainer>
      <Row className="mb-3">
        <Col>
          <h3>Directorio de empresas</h3>
        </Col>
        <Col xs={3}>
          <LinkContainer to="/new_company">
            <Button>Nueva empresa</Button>
          </LinkContainer>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : companies.length === 0 ? (
        <Message variant="secondary">
          Aun no hay empresas registradas, se el primero haciendo click en{' '}
          <b>"Nueva empresa"</b>
        </Message>
      ) : (
        <>
          <CompanyList companies={companies} handleDelete={deleteHandler} />
          <Paginate page={page} pages={pages} prefix="/" />
        </>
      )}
    </UniContainer>
  )
}

export default CompanyDirScreen
