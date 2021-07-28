import { Box, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { AspectRatioBox } from '../../lib/components/AspectRatioBox'

export const Menus = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Explore Our Menu
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2} md={4}>
          <AspectRatioBox borderRadius={16}>
            <Box bgcolor="whitesmoke" height="512px"></Box>
          </AspectRatioBox>
        </Grid>
        <Grid item xs={12} sm={2} md={4}>
          <AspectRatioBox borderRadius={16}>
            <Box bgcolor="whitesmoke" height="512px"></Box>
          </AspectRatioBox>
        </Grid>
        <Grid item xs={12} sm={2} md={4}>
          <AspectRatioBox borderRadius={16}>
            <Box bgcolor="whitesmoke" height="512px"></Box>
          </AspectRatioBox>
        </Grid>
      </Grid>
    </Container>
  )
}
