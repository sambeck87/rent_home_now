import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { selectProperties } from '../redux/properties/propertiesSlice';
import './style/HomePage.css';
import 'swiper/css';
import PropertyCard from '../components/PropertyCard';

const HomePage = () => {
  const properties = useSelector(selectProperties);
  const swiperRef = useRef(null);

  const handleSwiper = (swiper) => {
    swiperRef.current = swiper;
  };
  const slideToPrev = () => {
    swiperRef.current.slidePrev();
  };
  const slideToNext = () => {
    swiperRef.current.slideNext();
  };

  return (
    <div className="property-home">
      {properties.data && (
        <div className="property-home-left-side">
          <div className="property-home-left-upper text-center">
            <h1 className="text-muted">Latest Model</h1>
            <p>Please Select your preference</p>
            <span className="text-muted">....................</span>
          </div>
          <div className="property-slider">
            <div className="">
              <button type="button" className="btnPrev" onClick={slideToPrev}>
                <FaCaretLeft />
              </button>
              <button type="button" className="btnNext" onClick={slideToNext}>
                <FaCaretRight />
              </button>
              <Swiper
                className="swiper"
                scrollbar
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 50,
                  },
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
                grabCursor
                pagination
                onSwiper={handleSwiper}
              >
                {properties.data.map((property) => (
                  <SwiperSlide key={property.id}>
                    <PropertyCard property={property} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default HomePage;
