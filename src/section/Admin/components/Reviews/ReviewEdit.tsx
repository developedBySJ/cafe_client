import { Box, Button, Typography } from '@material-ui/core'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router'
import { Link, useHistory } from 'react-router-dom'
import { Spinner } from '../../../../lib'
import { DELETE_REVIEW } from '../../../../lib/api/Mutation/deleteReview'
import { UpdateReviewPayload, UPDATE_REVIEW } from '../../../../lib/api/Mutation/updateReview'
import { GET_REVIEWS_DETAILS } from '../../../../lib/api/query/reviewsDetails'
import { ResourceFactory } from '../../../../lib/components/EditResource'
import { useOnErrorNotify, useOnSuccessNotify } from '../../../../lib/hooks'

export const ReviewEdit = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading } = useQuery(['getReviewDetails', id], () => GET_REVIEWS_DETAILS(id))

  const notifyError = useOnErrorNotify()
  const notifySuccess = useOnSuccessNotify()

  const history = useHistory()

  const deleteReview = useMutation(DELETE_REVIEW, {
    onSuccess: () => {
      notifySuccess('Review deleted')
      return history.push('/admin/reviews')
    },
    onError: notifyError,
  })

  const updateReview = useMutation(UPDATE_REVIEW, {
    onSuccess: () => {
      notifySuccess('Review Updated')
      history.push('/admin/reviews')
      return
    },
    onError: notifyError,
  })

  const handleDelete = () => {
    const result = window.confirm('Are you sure you want to delete this review?')
    if (result) {
      deleteReview.mutate(id)
    }
  }

  if (isLoading) {
    return (
      <Box height="80vh">
        <Spinner fullWidth />
      </Box>
    )
  }
  return (
    <div>
      <ResourceFactory
        id={data?.data.id}
        title="Edit Review"
        onSubmit={(value) => updateReview.mutate(value as UpdateReviewPayload)}
        config={[
          { id: 'title', label: 'Title', type: 'text' },
          { id: 'comment', label: 'Comment', type: 'longText' },
          { id: 'ratings', label: 'ratings', type: 'number', disabled: true },
        ]}
        initialValues={data?.data || {}}
      >
        <Button variant="contained" color="primary" size="small" onClick={handleDelete}>
          Delete
        </Button>
        <Box sx={{ my: '1rem', width: '100%' }}>
          <Typography variant="h6">
            Created By :
            <Link to={`/admin/users/${data?.data.createdBy.id}/edit`} style={{ color: 'inherit' }}>
              {`${data?.data.createdBy.firstName} ${data?.data.createdBy.lastName}`}
            </Link>
          </Typography>
          <Typography variant="h6">
            Dish :
            <Link
              to={`/admin/menu-items/${data?.data.menuItem.id}/edit`}
              style={{ color: 'inherit' }}
            >
              {`${data?.data.menuItem.title}`}
            </Link>
          </Typography>
        </Box>
      </ResourceFactory>
    </div>
  )
}
