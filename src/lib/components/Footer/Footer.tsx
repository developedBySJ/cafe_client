import { Container, Button, Typography, Box, Grid, useTheme } from '@material-ui/core'
import React from 'react'

export const Footer = () => {
  const theme = useTheme()
  return (
    <Box bgcolor={theme.palette.grey[300]} padding="1rem 0" marginTop="2rem">
      <Container>
        <Box padding="1rem 0">
          <Typography variant="subtitle2" align="center" color="textSecondary">
            Made With
          </Typography>
          <Typography align="center" variant="subtitle2" color="textSecondary">
            React | TypeScript | ♥ | NestJs | Postgres
          </Typography>
          <Typography align="center" variant="subtitle2" color="textSecondary">
            By{' '}
            <a href="https://github.com/developedBySJ" target="_blank" rel="noreferrer">
              Swapnil J
            </a>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
