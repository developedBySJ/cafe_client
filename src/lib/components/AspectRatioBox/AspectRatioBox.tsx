import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: { position: 'relative' },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    '& > *': { height: '100%', width: '100%' },
  },
}))

const AspectRatioBox: React.FC<{ ratio?: number; borderRadius?: number }> = ({
  children,
  ratio = 1,
  borderRadius = 16,
}) => {
  const classes = useStyles()
  return (
    <div className={classes.root} style={{ borderRadius, overflow: 'hidden' }}>
      <div className={classes.wrapper}>{children}</div>
      <div style={{ paddingBottom: (1 / ratio) * 100 + '%' }} />
    </div>
  )
}

export { AspectRatioBox }
