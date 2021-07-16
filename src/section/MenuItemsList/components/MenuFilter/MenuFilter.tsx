import { Typography, FormControl, FormLabel, FormControlLabel, Slider } from '@material-ui/core'
import { RadioGroup, Checkbox } from '@material-ui/core'
import React from 'react'
import { Box, Radio } from '@material-ui/core'
import { ChevronDown } from 'react-feather'
import { Accordion } from '../../../../lib'

export const MenuFilter = () => {
  const [value, setValue] = React.useState('female')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }
  return (
    <>
      <Typography variant="h5" component="h1">
        Filter By
      </Typography>
      <Box marginTop="3rem">
        <Accordion title="Price">
          <Slider valueLabelDisplay="auto" aria-labelledby="range-slider" />
        </Accordion>
        <Accordion title="Availability">
          <FormControl component="fieldset">
            <RadioGroup name="sortBy" value={value} onChange={handleChange} color="primary" row>
              <FormControlLabel
                key={'Available'}
                value={true}
                control={<Radio color="primary" size="small" />}
                label="Available"
              />
              <FormControlLabel
                key={'Not_Available'}
                value={false}
                control={<Radio color="primary" size="small" />}
                label="Not Available"
              />
            </RadioGroup>
          </FormControl>
        </Accordion>
        <Accordion title="Type">
          <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <Box display="flex" justifyContent="space-between">
              <FormControlLabel
                control={<Checkbox onChange={handleChange} color="primary" />}
                label="Veg"
              />
              <FormControlLabel
                control={<Checkbox onChange={handleChange} color="primary" />}
                label="Non Veg"
              />
            </Box>
          </FormControl>
        </Accordion>
        <Accordion title="Discount"></Accordion>
        <Accordion title="Preparation Time"></Accordion>
        <Accordion title="Ingredients"></Accordion>
      </Box>
    </>
  )
}
