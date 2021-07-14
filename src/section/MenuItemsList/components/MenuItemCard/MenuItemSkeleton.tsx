import { lighten } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { PRIMARY_LIGHT } from '../../../../Theme/token'

export const MenuItemSkeleton = () => {
  return (
    <Card elevation={0}>
      <CardActionArea disableRipple disableTouchRipple>
        <Skeleton variant="rect" width={'100%'} height={164} />
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" component="div">
              <Skeleton variant="rect" width="150px" />
            </Typography>
            <Typography
              variant="body1"
              component="div"
              color="primary"
              style={{ whiteSpace: 'nowrap' }}
            >
              <Skeleton variant="rect" width="50px" />
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" marginTop="8px">
            <Skeleton variant="rect" width="50px" />
            &nbsp; &nbsp;
            <Skeleton variant="rect" width="50px" />
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ padding: 0 }}>
        <Skeleton
          variant="rect"
          width="100%"
          height="56px"
          style={{ backgroundColor: lighten(PRIMARY_LIGHT, 0.7) }}
        />
      </CardActions>
    </Card>
  )
}
