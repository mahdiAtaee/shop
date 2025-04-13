/* eslint-disable react/prop-types */
import React from 'react'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Gallery = ({ images }) => {
    images = [...images, ...images, ...images]
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            style={{ height: "540px" }}
            navigation
            autoplay
            pagination={{ clickable: true }}
        >
            {images.map((image, index) => (
                <SwiperSlide key={index}>
                    <a className='card border-0' style={{ height: '100%' }}>
                        <img
                            className="card-img rounded"
                            style={{ objectFit: 'cover', height: '100%' }}
                            src={image}
                            alt="card image"
                        />
                    </a>

                </SwiperSlide>
            ))}
            ...
        </Swiper>
    )
}

export default Gallery