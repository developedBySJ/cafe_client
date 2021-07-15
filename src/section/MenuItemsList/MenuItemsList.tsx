import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  makeStyles,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
} from '@material-ui/core'
import { Checkbox } from '@material-ui/core'
import { useState } from 'react'
import { ChevronDown } from 'react-feather'
import { useQuery } from 'react-query'
import { MENU_ITEMS } from '../../lib/api/query/menuItems'
import { MenuItemSortBy, MenuItemsQuery } from '../../lib/api/query/menuItems/menuItems.type'
import { ResponsiveDialog } from '../../lib/components/'
import { Sort } from '../../lib/types'
import { MenuItemCard } from './components'

const MenuItemSortList = [
  { label: 'Price', value: MenuItemSortBy.Price },
  { label: 'Availability', value: MenuItemSortBy.IsAvailable },
  { label: 'Discount', value: MenuItemSortBy.Discount },
  { label: 'Preparation Time', value: MenuItemSortBy.PrepTime },
  { label: 'Created Date', value: MenuItemSortBy.CreatedAt },
]

const useStyles = makeStyles((theme) => ({
  fixed: {
    position: 'sticky',
    top: 60,
    zIndex: 100,
    padding: '1rem 0',
    background: 'rgba(250,250,250,0.8)',
    backdropFilter: 'saturate(180%) blur(8px)',
  },
}))

const MenuItemsList = () => {
  const { data } = useQuery(['users', {} as MenuItemsQuery], () => MENU_ITEMS({}), {
    onSuccess: ({ data }) => console.log(data),
  })

  const [isSortOpen, setIsSortOpen] = useState(false)
  const [value, setValue] = useState('female')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  }
  const classes = useStyles()

  return (
    <>
      <ResponsiveDialog
        onClose={() => setIsSortOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={isSortOpen}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Sort By</DialogTitle>
        <DialogContent>
          <Box>
            <FormControl component="fieldset">
              <FormLabel component="legend">Sort</FormLabel>
              <RadioGroup name="sort" value={value} onChange={handleChange} row color="primary">
                <FormControlLabel
                  value={Sort.ASC}
                  control={<Radio color="primary" />}
                  label="Ascending"
                />
                <FormControlLabel
                  value={Sort.DESC}
                  control={<Radio color="primary" />}
                  label="Descending"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box margin="1rem 0">
            <FormControl component="fieldset">
              <FormLabel component="legend">Sort By</FormLabel>
              <RadioGroup name="sortBy" value={value} onChange={handleChange} color="primary">
                {MenuItemSortList.map(({ value, label }, index) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio color="primary" />}
                    label={label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsSortOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsSortOpen(false)} variant="contained" color="primary">
            Sort
          </Button>
        </DialogActions>
      </ResponsiveDialog>
      <Container>
        <Typography variant="h4" style={{ padding: '3rem 0' }}>
          Search Result for "Food"
          <Typography variant="h6" component="span">
            ({data?.data.totalCount}) Items Found
          </Typography>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={3}>
            <Typography variant="h5" component="h1" gutterBottom>
              Filter By
            </Typography>
            <Box>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <Typography variant="h6" component="h1" color="textPrimary">
                    Availability
                  </Typography>
                </FormLabel>
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
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <Typography variant="h6" component="h1" color="textPrimary">
                    Type
                  </Typography>
                </FormLabel>
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
              <Typography variant="h6" component="h1" color="textPrimary">
                Price
              </Typography>
              <Slider valueLabelDisplay="auto" aria-labelledby="range-slider" />
            </Box>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Box textAlign="right" marginBottom="2rem">
              <Button
                variant="outlined"
                onClick={() => setIsSortOpen(true)}
                size="small"
                endIcon={<ChevronDown strokeWidth="1.5px" />}
              >
                Sort By : Recommended
              </Button>
            </Box>
            <Grid container spacing={2}>
              {data?.data.result.map((menuItem) => (
                <Grid item xs={12} sm={6} lg={4} key={menuItem.id}>
                  <MenuItemCard menuItem={menuItem} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export { MenuItemsList }
