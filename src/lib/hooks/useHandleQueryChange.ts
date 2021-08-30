import { GridSortModel } from "@mui/x-data-grid"
import { useCallback } from "react"

export const useHandleQueryChange = (query: string, setQuery: (val: string) => void) => {

  const handlePageChange = useCallback((page: number) => {
    const newQuery = new URLSearchParams(query)
    newQuery.set('page', String(page))
    setQuery('?' + newQuery.toString())
  }, [query])

  const handleSortChange = useCallback((model: GridSortModel) => {
    console.log(model)
    const { field, sort } = model[0] || {}

    const newQuery = new URLSearchParams(query)
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
  }, [query])

  return {
    handlePageChange,
    handleSortChange
  }
}

