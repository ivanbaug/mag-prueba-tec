import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const EmployeeDetails = ({ employee }) => {
  return (
    <Card>
      <Card.Header as="h3">{employee.name}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>Departamento:</strong>&nbsp;
          {employee.department}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Compañia:</strong>&nbsp;
          {employee.company_str}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default EmployeeDetails
