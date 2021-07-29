import React from 'react'
import { Box, Avatar, Typography, Grid } from '@material-ui/core'

export const ReviewCard = () => {
  return (
    <Box marginTop="1rem">
      <Box display="flex">
        <Box marginRight="1rem">
          <Avatar
            sizes="48px"
            style={{ marginTop: 4 }}
            src={'https://d3gy1em549lxx2.cloudfront.net/12c23c5a-fae4-455e-8f04-79205ef64d00.JPG'}
          />
        </Box>
        <div>
          <Typography variant="body1" style={{ fontWeight: 500 }}>
            James Bond
          </Typography>
          <Typography variant="body1" gutterBottom>
            {new Date().toDateString()}
          </Typography>
          <Typography variant="body2" style={{ textAlign: 'justify' }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis doloribus, aspernatur
            tempora at neque autem temporibus blanditiis, vitae rerum eaque quae. Maxime ullam
            dolore porro deserunt ad. Laborum, perferendis cumque.
          </Typography>
        </div>
      </Box>
    </Box>
  )
}
