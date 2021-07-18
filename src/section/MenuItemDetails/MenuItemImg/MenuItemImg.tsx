import { Box, Grid } from '@material-ui/core'
import React from 'react'
import { Slider } from '../../../lib/components'
import { AspectRatioBox } from '../../../lib/components/AspectRatioBox'

export const MenuItemImg: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <div>
      {/* <Slider
          components={images.map((i) => (
            <AspectRatioBox ratio={845 / 564}>
              <img
                src={i}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
            </AspectRatioBox>
          ))}
        /> */}
      <Grid container spacing={1}>
        {images.length === 1 && (
          <Grid item xs={12}>
            <AspectRatioBox ratio={845 / 564}>
              <img
                src={images[0]}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
            </AspectRatioBox>
          </Grid>
        )}
        {images.length === 2 &&
          images.map((i, index) => (
            <Grid item xs={12}>
              <AspectRatioBox ratio={845 / 564}>
                <img
                  src={i}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              </AspectRatioBox>
            </Grid>
          ))}
        {images.length === 3 && (
          <>
            {images.slice(0, -1).map((i, index) => (
              <Grid item key={index} xs={6}>
                <AspectRatioBox ratio={845 / 564}>
                  <img
                    src={i}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                    }}
                  />
                </AspectRatioBox>
              </Grid>
            ))}
            <Grid item xs={12}>
              <AspectRatioBox ratio={845 / 564}>
                <img
                  src={images[2]}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              </AspectRatioBox>
            </Grid>
          </>
        )}

        {images.length > 3 &&
          images.map((i, index) => (
            <Grid item key={index} xs={6}>
              <AspectRatioBox ratio={845 / 564}>
                <img
                  src={i}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              </AspectRatioBox>
            </Grid>
          ))}
      </Grid>
    </div>
  )
}
