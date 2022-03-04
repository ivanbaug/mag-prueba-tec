import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, keyword = '', isAdmin = false }) => {


  if (keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0]
  }
  // console.log('Keyword: ', keyword)

  return (
    pages > 1 && (
      <Pagination className='justify-content-center' >
        {
          page > 1 &&
          <LinkContainer
            to={`/?keyword=${keyword}&page=${page - 1}`}
          >
            <Pagination.Prev />
          </LinkContainer>
        }

        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={!isAdmin
              ? `/?keyword=${keyword}&page=${x + 1}`
              : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`
            }
          >
            <Pagination.Item
              active={(x + 1) === page}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
        {
          page !== pages &&
          <LinkContainer
            to={`/?keyword=${keyword}&page=${page + 1}`}
          >
            <Pagination.Next />
          </LinkContainer>
        }
      </Pagination>
    )
  )
}

export default Paginate
