import { IconButton, lighten } from '@material-ui/core'
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
}

const ProductCardSlider = ({
  title,
  cards,
  isLoading,
  skeltonCard,
  error,
  sliderPerView,
}: IProductCardSliderProps) => {
  const navigation = (
    <>
      <IconButton
        color="primary"
        id="slider-prev"
        style={{
          position: 'absolute',
          top: '50%',
          left: '2%',
          transform: 'translate(0%,-50%)',
          backgroundColor: lighten(PRIMARY_MAIN, 0.9),
        }}
      >
        <ChevronLeft size="24px" />
      </IconButton>
      <IconButton
        color="primary"
        id="slider-next"
        style={{
          position: 'absolute',
          top: '50%',
          right: '2%',
          transform: 'translate(0%,-50%)',
          backgroundColor: lighten(PRIMARY_MAIN, 0.9),
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
      <Swiper
        swipeHandler="#swiper-card-slider"
        id={`swiper-card-slider`}
        style={{
          width: '100%',
          zIndex: 0,
        }}
        scrollbar={{ snapOnRelease: true, hide: true }}
        navigation={{ nextEl: '#slider-next', prevEl: '#slider-prev' }}
        breakpoints={{
          320: {
            slidesPerView: (sliderPerView && sliderPerView[0]) || 1.1,
            spaceBetween: 6,
          },

          600: {
            slidesPerView: (sliderPerView && sliderPerView[1]) || 2.2,
            spaceBetween: 14,
          },

          900: {
            slidesPerView: (sliderPerView && sliderPerView[2]) || 4,
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
      {navigation}
    </div>
  )
}

export { ProductCardSlider }
