import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import men from "../assets/men1.jpg";
import women from "../assets/women1.jpeg";
import { Link } from "react-router-dom";

const Banner = () => {
  const data = [{ image: men }, { image: women }];
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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" pt-16 overflow-hidden">
      <Slider {...settings}>
        {data.map((e) => (
          <div className="relative h-screen  flex items-center">
            <div className="flex items-center justify-center absolute bottom-10 left-1/2 ">
              <Link className="text-xl font-thin text-white">shop now </Link>
            </div>
            <img
              src={e.image}
              alt="Phone 1"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
