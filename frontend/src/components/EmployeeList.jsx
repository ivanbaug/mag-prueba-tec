import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const EmployeeList = ({ employees, onDelete: handleDelete }) => {
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th className="text-center">Depto</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {employees.map((c) => (
          <tr key={c.id}>
            <td className="align-middle">{c.name}</td>
            <td className="align-middle text-center">{c.department}</td>
            <td className="text-center">
              <LinkContainer to={`/employee/${c.id}/edit`}>
                <Button className="me-2">
                  <i className="fas fa-edit"></i>
                </Button>
              </LinkContainer>
              <LinkContainer to={`/employee/${c.id}`}>
                <Button variant="success" className="me-2">
                  <i className="fas fa-search"></i>
                </Button>
              </LinkContainer>
              <Button variant="danger" onClick={() => handleDelete(c.id)}>
                <i className="fas fa-trash"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default EmployeeList
