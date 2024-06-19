import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import phone1 from "../assets/phone1.jpg";
import phone2 from "../assets/phone2.jpg";

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };

    return (
        <div className='pt-5 m-3 relative'>
            <Slider {...settings}>
                <div className='h-[500px] flex items-center'>
                    <img src={phone1} alt="Phone 1" className='w-full h-full object-cover' />
                </div>
                <div className='h-[500px] flex items-center justify-center'>
                    <img src={phone2} alt="Phone 2" className='w-full h-full object-cover' />
                </div>
            </Slider>
        </div>
    );
}

export default Banner;
