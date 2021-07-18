import React from 'react'
import { IconButton, lighten } from '@material-ui/core'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PRIMARY_MAIN } from '../../../Theme/token'

interface SliderProps {
  components: JSX.Element[]
}

export const Slider = ({ components }: SliderProps) => {
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
          backgroundColor: lighten(PRIMARY_MAIN, 0.95),
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
          backgroundColor: lighten(PRIMARY_MAIN, 0.95),
        }}
      >
        <ChevronRight size="24px" />
      </IconButton>
    </>
  )

  return (
    <div style={{ position: 'relative' }}>
      <Swiper
        swipeHandler="#swiper-product-images"
        id={`swiper-product-images`}
        style={{
          width: '100%',
          zIndex: 0,
        }}
        navigation={{ nextEl: '#slider-next', prevEl: '#slider-prev' }}
        slidesPerView={1}
        autoplay={true}
      >
        {components.length &&
          components.map((Component, index) => {
            return <SwiperSlide key={`card-${index}`}>{Component}</SwiperSlide>
          })}
      </Swiper>
      {navigation}
    </div>
  )
}
