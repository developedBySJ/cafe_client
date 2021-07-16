import React from 'react'
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@material-ui/core'
import { ChevronDown } from 'react-feather'

interface AccordionProps {
  title: string
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  return (
    <MuiAccordion>
      <AccordionSummary
        expandIcon={<ChevronDown />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="body1" style={{ fontWeight: 450 }} component="h1" color="textPrimary">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  )
}
