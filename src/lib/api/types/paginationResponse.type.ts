interface Pages {
  next: string | null
  prev: string | null
  first: string
  last: string
}

export interface PaginationResponse<T> {
  result: T[]
  totalCount: number
  totalPages: number
  pages: Pages
}
