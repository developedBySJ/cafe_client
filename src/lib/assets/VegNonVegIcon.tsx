import React from 'react'
import { makeStyles } from '@material-ui/core'

interface UseStyleProps {
  isVeg: boolean
  size: number
}

const VegColor = '#00BA88'
const NonVegColor = '#F5474A'

const _getColor = (isVeg: boolean) => (isVeg ? VegColor : NonVegColor)

const useStyle = makeStyles((theme) => ({
  border: {
    width: ({ size }: UseStyleProps) => size,
    height: ({ size }: UseStyleProps) => size,
    borderRadius: 4,
    border: ({ isVeg }: UseStyleProps) => `2px solid ${_getColor(isVeg)}`,
    position: 'relative',
  },
  point: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: ({ size }: UseStyleProps) => size / 3,
    height: ({ size }: UseStyleProps) => size / 3,
    borderRadius: 100,
    backgroundColor: ({ isVeg }: UseStyleProps) => _getColor(isVeg),
    transform: 'translate(-50%,-50%)',
  },
}))

interface VegNonVegIconProps {
  isVeg?: boolean
  size?: number
  className?: string
}

export const VegNonVegIcon: React.FC<VegNonVegIconProps> = ({
  isVeg = false,
  size = 18,
  className,
}) => {
  const classes = useStyle({ isVeg, size })
  return (
    <div className={className}>
      <div className={classes.border}>
        <div className={classes.point}></div>
      </div>
    </div>
  )
}
