/* eslint-disable react/prop-types */
import React from 'react'
import { Autoplay, A11y, EffectFade, Controller, Navigation } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';

const Header = () => {
    const totalBannerCount = [1, 2, 3, 4]
    const totalCategoryBannerCount = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const bannerSrc = (index) => `/assets/img/banner/banner-${index}.webp`;
    const categoryBannerSrc = (index) => `/assets/img/category-product/banner_${index}.webp`;

    return (
        <section className="section-gap section-top bg-white text-center mt-md-5 pt-5">
            <div className="container-fluid">
                <div className="row justify-content-md-center align-items-center">
                    <div className="col-md-12 banner-section">
                        <Swiper
                            modules={[A11y, Autoplay, EffectFade]}
                            spaceBetween={0}
                            slidesPerView={1}
                            effect='fade'
                            autoplay
                        >
                            {totalBannerCount.map((_, index) => (
                                <SwiperSlide key={index} style={{ height: '350px', width: '100%' }}>
                                    <img src={bannerSrc(index + 1)} className='object-cover' />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    <div className="col-md-10 mt-5">
                        <Swiper
                            modules={[A11y, Autoplay, EffectFade, Controller, Navigation]}
                            spaceBetween={50}
                            slidesPerView={6}
                            autoplay
                            controller
                            breakpoints={{
                                0: {
                                    slidesPerView: 3,
                                },
                                639: {
                                    slidesPerView: 3,
                                },
                                865: {
                                    slidesPerView: 4
                                },
                                1000: {
                                    slidesPerView: 6
                                },
                                1500: {
                                    slidesPerView: 7
                                },
                            }}
                        >
                            {totalCategoryBannerCount.map((_, index) => (
                                <SwiperSlide key={index}>
                                    <Image
                                        width={130}
                                        height={130}
                                        src={categoryBannerSrc(index + 1)}
                                        className='img-slider'
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Header