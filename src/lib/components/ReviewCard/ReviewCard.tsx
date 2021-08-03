import React from 'react'
import { Box, Avatar, Typography, Grid } from '@material-ui/core'
import { IReview } from '../../api/types/review.type'

interface ReviewCardProps {
  data: IReview
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ data }) => {
  const { createdBy, comment, createdAt, ratings, id, title, image } = data
  const { firstName, lastName, avatar, email } = createdBy
  return (
    <Box marginTop="1rem">
      <Box display="flex">
        <Box marginRight="1rem">
          <Avatar sizes="48px" style={{ marginTop: 4 }} src={avatar} />
        </Box>
        <div>
          <Typography variant="body1" style={{ fontWeight: 500 }}>
            {`${firstName || ''} ${lastName || ''}`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(createdAt).toDateString()}
          </Typography>
          <Typography variant="body2" style={{ textAlign: 'justify' }}>
            {comment}
          </Typography>
        </div>
      </Box>
    </Box>
  )
}
