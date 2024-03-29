import { Box, IconButton, lighten } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Typography } from '@material-ui/core'
import { PRIMARY_MAIN } from '../../../Theme/token'

interface IProductCardSliderProps {
  cards: JSX.Element[]
  title: string
  isLoading: boolean
  error: boolean
  skeltonCard: JSX.Element
  sliderPerView?: [number, number, number]
  id?: string
}

const ProductCardSlider = ({
  title,
  cards,
  isLoading,
  skeltonCard,
  error,
  sliderPerView = [1.1, 2.2, 4],
  id = '',
}: IProductCardSliderProps) => {
  const Navigation: React.FC<{ show?: boolean }> = ({ show = true }) => (
    <>
      <IconButton
        color="primary"
        id={`${id}-slider-prev`}
        style={{
          position: 'absolute',
          top: '50%',
          left: '2%',
          transform: 'translate(0%,-50%)',
          backgroundColor: lighten(PRIMARY_MAIN, 0.9),
          zIndex: 2,
        }}
      >
        <ChevronLeft size="24px" />
      </IconButton>
      <IconButton
        color="primary"
        id={`${id}-slider-next`}
        style={{
          position: 'absolute',
          top: '50%',
          right: '2%',
          transform: 'translate(0%,-50%)',
          backgroundColor: lighten(PRIMARY_MAIN, 0.9),
          zIndex: 2,
        }}
      >
        <ChevronRight size="24px" />
      </IconButton>
    </>
  )

  return (
    <div style={{ position: 'relative' }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <div>
        {cards.length || isLoading ? (
          <>
            <Navigation />
            <Swiper
              swipeHandler={`#${id}-swiper-card-slider`}
              id={`${id}-swiper-card-slider`}
              style={{
                width: '100%',
                zIndex: 0,
              }}
              scrollbar={{ snapOnRelease: true, hide: true }}
              navigation={{ nextEl: `#${id}-slider-next`, prevEl: `#${id}-slider-prev` }}
              breakpoints={{
                320: {
                  slidesPerView: sliderPerView[0],
                  spaceBetween: 6,
                },

                600: {
                  slidesPerView: sliderPerView[1],
                  spaceBetween: 14,
                },

                900: {
                  slidesPerView: sliderPerView[2],
                  spaceBetween: 16,
                },
              }}
            >
              {isLoading || error
                ? Array.from({ length: 4 }).map((m, index) => {
                    return <SwiperSlide key={`loading-${index}`}>{skeltonCard}</SwiperSlide>
                  })
                : cards.length &&
                  cards.map((card, index) => {
                    return <SwiperSlide key={`card-${index}`}>{card}</SwiperSlide>
                  })}
            </Swiper>
          </>
        ) : (
          <Box
            sx={{
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6">No Items</Typography>
          </Box>
        )}
      </div>
    </div>
  )
}

export { ProductCardSlider }
