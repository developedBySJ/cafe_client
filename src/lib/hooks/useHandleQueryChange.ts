import { GridSortModel } from "@mui/x-data-grid"
import { useState } from "react"

export const useHandleQueryChange = (initialQuery: string = '?limit=25') => {

  const [query, setQuery] = useState(initialQuery)

  const newQuery = new URLSearchParams(query)

  const handlePageChange = (page: number) => {
    newQuery.set('page', String(page))
    setQuery('?' + newQuery.toString())
    console.log(newQuery.toString())
  }

  const handleSortChange = (model: GridSortModel) => {
    const { field, sort } = model[0] || {}

    if (field) {
      newQuery.set('sortBy', field)
    } else {
      newQuery.delete('sortBy')
    }

    if (sort) {
      newQuery.set('sort', sort?.toUpperCase())
    } else {
      newQuery.delete('sort')
    }

    setQuery('?' + newQuery.toString())
    console.log(newQuery.toString())
  }

  return {

    handlePageChange,
    handleSortChange,
    query,
    setQuery
  }
}

