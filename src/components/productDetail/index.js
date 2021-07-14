import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Thumbs } from 'swiper/core';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Thumbs]);

const ProductDetails = ({ products }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { id } = useParams();
  const filteredProduct = products.filter((product) => {
    return product.productTitle == id;
  });
  return filteredProduct.map((item, index) => {
    return (
      <div key={index} className='product_detail'>
        <div className='slides_container'>
          <Swiper
            wrapperTag='ul'
            style={{
              '--swiper-navigation-color': '#4077ff',
            }}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
          >
            {item.productPhotos &&
              item.productPhotos.map((image, index) => {
                return (
                  <SwiperSlide tag='li' key={index}>
                    <img src={image} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <Swiper
            wrapperTag='ul'
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            slidesPerView={3}
            className="thumbs"
          >
            {item.productPhotos &&
              item.productPhotos.map((image, index) => {
                return (
                  <SwiperSlide tag='li' key={index}>
                    <img src={image} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
        <div className="product_detail_info" >
          <h2>{item.productTitle}</h2>
          <p>{item.productDescription}</p>
        </div>
      </div>
    );
  });
};

export default ProductDetails;
