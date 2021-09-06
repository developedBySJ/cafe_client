import { Typography, FormControl, FormLabel, FormControlLabel, Button } from '@material-ui/core'
import { RadioGroup, Checkbox } from '@material-ui/core'
import React from 'react'
import { Box, Radio } from '@material-ui/core'
import { Accordion } from '../../../../lib'
import { useHistory } from 'react-router'
import { initialFilter } from '../..'
import { MenuItemSortBy } from '../../../../lib/api/query/menuItems/menuItems.type'

export type MenuFilterState = {
  search?: string
  priceGte?: string
  priceLte?: string
  prepTime: string
  isVeg: string
  isAvailable: string
  discount: string
  sort?: string
  sortBy?: `sortBy=${MenuItemSortBy}`
}
interface MenuFilterProps {
  filter: MenuFilterState
  setFilter: (data: MenuFilterState) => void
}

const priceConfig = [
  { label: 'Under ₹100', value: { gte: 1, lte: 100 } },
  { label: '₹100 - ₹200', value: { gte: 100, lte: 200 } },
  { label: '₹200 - ₹300', value: { gte: 200, lte: 300 } },
  { label: '₹300 - ₹400', value: { gte: 300, lte: 400 } },
  { label: '₹400 - ₹500', value: { gte: 400, lte: 500 } },
  { label: 'Over ₹500', value: { gte: 500, lte: 100000000 } },
]

export const MenuFilter: React.FC<MenuFilterProps> = ({ filter, setFilter }) => {
  const query = new URLSearchParams(filter)
  const history = useHistory()

  const [value, setValue] = React.useState<null | boolean>(
    !!['true', true, 1].includes(query.get('isAvailable') || ''),
  )
  const [isVeg, setIsVeg] = React.useState<null | boolean>(
    !!['true', true, 1].includes(query.get('isVeg') || ''),
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setValue(['true', true, 1].includes(value))
    setFilter({ ...filter, isAvailable: `isAvailable=${value}` })
  }

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setIsVeg(['true', true, 1].includes(value))
    setFilter({ ...filter, isAvailable: `isVeg=${value}` })
  }

  const handlePriceChange = (gte?: number, lte?: number) => () => {
    setFilter({
      ...filter,
      ...(gte && { priceGte: `priceGte=${gte}` }),
      ...(lte && { priceLte: `priceLte=${lte}` }),
    })
  }

  const handleDiscountChange = (discount: number) => () => {
    setFilter({
      ...filter,
      ...(discount && { discount: `discount=${discount}` }),
    })
  }

  return (
    <>
      <Typography variant="h5" component="h1">
        Filter By
      </Typography>
      <Box marginTop="3rem">
        <Accordion title="Price">
          <div>
            {priceConfig.map((p, i) => (
              <Typography
                key={i}
                variant="body1"
                gutterBottom
                style={{ cursor: 'pointer' }}
                onClick={handlePriceChange(p.value.gte, p.value.lte)}
              >
                {p.label}
              </Typography>
            ))}
          </div>
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
            <RadioGroup name="type" value={isVeg} onChange={handleTypeChange} color="primary" row>
              <FormControlLabel
                key={'Veg'}
                value={true}
                control={<Radio color="primary" size="small" />}
                label="Veg"
              />
              <FormControlLabel
                key={'Non-veg'}
                value={false}
                control={<Radio color="primary" size="small" />}
                label="Non Veg"
              />
            </RadioGroup>
          </FormControl>
        </Accordion>
        <Accordion title="Discount">
          <div>
            <Typography variant="body1" gutterBottom onClick={handleDiscountChange(10)}>
              10% And Above
            </Typography>
            <Typography variant="body1" gutterBottom onClick={handleDiscountChange(20)}>
              20% And Above
            </Typography>
            <Typography variant="body1" gutterBottom onClick={handleDiscountChange(30)}>
              30% And Above
            </Typography>
          </div>
        </Accordion>
        <Button
          fullWidth
          onClick={() => {
            setFilter(initialFilter)
          }}
        >
          Clear Filter
        </Button>
      </Box>
    </>
  )
}
