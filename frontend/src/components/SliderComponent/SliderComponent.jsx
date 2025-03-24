import React from 'react'
import Slider from 'react-slick'
import './SliderCss.css'
const SliderComponent = ({ arrImages }) => {
  var settings = {
    autoplay: false,
    speed: 1500,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots custom-dots', // Add this line,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />
    appendDots: dots => (
      <div
        style={{
          borderRadius: '10px',
          padding: '10px'
        }}
      >
        <ul style={{ margin: '0px' }} className=''>
          {' '}
          {dots}{' '}
        </ul>
      </div>
    )
  }
  function SampleNextArrow (props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'red' }}
        onClick={onClick}
      />
    )
  }

  function SamplePrevArrow (props) {
    const { className, style, onClick } = props
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: 'green' }}
        onClick={onClick}
      />
    )
  }
  return (
    <Slider {...settings}>
      {arrImages.map(img => (
        <img src={img} alt='slider' className='' />
      ))}
    </Slider>
  )
}

export default SliderComponent
