import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page }) => {
  return (
    pages > 1 && (
      <Pagination className="justify-content-center">
        {page > 1 && (
          <LinkContainer to={`/?page=${page - 1}`}>
            <Pagination.Prev />
          </LinkContainer>
        )}
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer key={x + 1} to={`/?page=${x + 1}`}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
        {page !== pages && (
          <LinkContainer to={`/?page=${page + 1}`}>
            <Pagination.Next />
          </LinkContainer>
        )}
      </Pagination>
    )
  )
}

export default Paginate
