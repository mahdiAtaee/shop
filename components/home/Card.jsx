/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import ProductItem from '../products/List/ProductItem';
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Card = ({ products, title }) => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <div className="container-fluid">
            <div className='row'>
                <div className='col-12 border p-4 rounded'>
                    <div className='w-100 d-flex align-items-center justify-content-between pb-3 font-family-vazir'>
                        <div>
                            <span>محصولات ما</span>
                            <p className='h3'>
                                <span className='text-dark-green'>{title} </span>
                                محصولات ما
                            </p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <button ref={prevRef} className='btn btn-sm btn-outline-dark rounded-circle mr-2 me-2 arrow-btn'>
                                <i className="fa fa-arrow-right" aria-hidden="true"></i>
                            </button>
                            <button ref={nextRef} className='btn btn-sm btn-outline-dark rounded-circle me-2 arrow-btn'>
                                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div className='w-100 row'>
                        <Swiper
                            onBeforeInit={(swiper) => {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                            }}
                            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                            modules={[Navigation, A11y]}
                            spaceBetween={10}
                            slidesPerView={1}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                        >
                            {products && products.map(product => (
                                <SwiperSlide key={product.id} className='col-4'>
                                    <ProductItem {...product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Card