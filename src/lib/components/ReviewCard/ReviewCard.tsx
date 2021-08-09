import React from 'react'
import { Box, Avatar, Typography, Chip, darken, lighten } from '@material-ui/core'
import { IReview } from '../../api/types/review.type'
import { Star } from 'react-feather'
import { WARNING_MAIN } from '../../../Theme/token'
import { makeStyles } from '@material-ui/core'
import moment from 'moment'

const useStyle = makeStyles({
  ratingTag: {
    backgroundColor: lighten('#FFD789', 0.5),
    color: darken('#946200', 0.5),
    marginRight: '0.5rem',
  },
})

interface ReviewCardProps {
  data: IReview
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ data }) => {
  const { createdBy, comment, createdAt, ratings, title } = data
  const { firstName, lastName, avatar } = createdBy

  const classes = useStyle()

  return (
    <Box marginTop="1rem">
      <Box display="flex">
        <Box marginRight="1rem">
          <Avatar sizes="48px" style={{ marginTop: 4 }} src={avatar} />
        </Box>
        <div>
          <Box
            display="flex"
            alignItems="center"
            overflow="hidden"
            maxWidth="300px"
            width="50vw"
            minWidth="200px"
          >
            <Chip
              icon={
                <Star size="18px" style={{ marginLeft: '8px' }} fill={WARNING_MAIN} stroke={'0'} />
              }
              size="small"
              label={ratings}
              variant="default"
              className={classes.ratingTag}
            />

            <Typography
              variant="h6"
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </Typography>
          </Box>
          <Typography variant="body1" align="justify" gutterBottom>
            {comment}
          </Typography>
          <Box display="flex">
            <Typography variant="caption" color="textSecondary">
              {`${firstName || ''} ${lastName || ''}`} &nbsp;
            </Typography>
            <Typography variant="caption" color="textSecondary" gutterBottom>
              &nbsp;{moment(createdAt).fromNow()}
            </Typography>
          </Box>
        </div>
      </Box>
    </Box>
  )
}
