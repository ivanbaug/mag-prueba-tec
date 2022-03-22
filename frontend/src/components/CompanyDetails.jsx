import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const CompanyDetails = ({ company }) => {
  return (
    <Card>
      <Card.Header as="h3">{company.name}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Descripcion:</strong>&nbsp;
          {company.description}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Empleados:</strong>&nbsp;
          {company.num_employees}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default CompanyDetails
