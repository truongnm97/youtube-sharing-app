import { useEffect } from 'react'
import './Pagination.style.css'

export type TPaginationProps = {
  currentPage: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  pageSize,
  total,
  onPageChange,
}: TPaginationProps) {
  const totalPages = Math.ceil(total / pageSize)
  const visiblePages = Math.min(3, totalPages)
  useEffect(() => {
    if (currentPage < 1) {
      handlePageChange(1)
    } else if (currentPage > totalPages) {
      handlePageChange(totalPages)
    }
  }, [currentPage, totalPages])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const renderPaginationItems = () => {
    const items = []
    const halfVisiblePages = Math.floor(visiblePages / 2)
    const startPage = Math.max(1, currentPage - halfVisiblePages)
    const endPage = Math.min(startPage + visiblePages - 1, totalPages)

    if (startPage > 1) {
      items.push(
        <li key={1}>
          <button onClick={() => handlePageChange(1)}>1</button>
        </li>,
      )
      if (startPage > 2) {
        items.push(<li key='ellipsis-start'>...</li>)
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <li key={page} className={currentPage === page ? 'active' : ''}>
          <button onClick={() => handlePageChange(page)}>{page}</button>
        </li>,
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<li key='ellipsis-end'>...</li>)
      }
      items.push(
        <li key={totalPages}>
          <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
        </li>,
      )
    }

    return items
  }

  return (
    <ul className='pagination'>
      <li>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
      </li>
      {renderPaginationItems()}
      <li>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </li>
    </ul>
  )
}
