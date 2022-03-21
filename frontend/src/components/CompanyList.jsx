import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CompanyList = ({ companies, handleDelete }) => {
  return (
    <Table striped hover responsive>
      <thead>
        <tr>
          <th>Nombre</th>
          <th className="text-center"># Empleados</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {companies.map((c) => (
          <tr key={c.id}>
            <td className="align-middle">{c.name}</td>
            <td className="align-middle text-center">{c.num_employees}</td>
            <td className="text-center">
              <LinkContainer to={`/emp/${c.id}/edit`}>
                <Button className="me-2">
                  <i className="fas fa-edit"></i>
                </Button>
              </LinkContainer>
              <LinkContainer to={`/emp/${c.id}`}>
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

export default CompanyList
