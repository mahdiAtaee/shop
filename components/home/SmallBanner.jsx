import React from 'react'
import Image from 'next/image'

const SmallBanner = () => {
    return (
        <section className='section-gap mt-md-0 p-md-4'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 col-md-3'>
                        <div className='small-banner'>
                            <Image src="/assets/img/banner/small-banner-3.webp" className='object-cover' fill alt='banner' />
                        </div>
                    </div>
                    <div className='col-12 col-md-3'>
                        <div className='small-banner'>
                            <Image src="/assets/img/banner/small-banner-4.webp" className='object-cover' fill alt='banner' />
                        </div>
                    </div>
                    <div className='col-12 col-md-3'>
                        <div className='small-banner'>
                            <Image src="/assets/img/banner/small-banner-5.webp" className='object-cover' fill alt='banner' />
                        </div>
                    </div>
                    <div className='col-12 col-md-3'>
                        <div className='small-banner'>
                            <Image src="/assets/img/banner/small-banner-6.webp" className='object-cover' fill alt='banner' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SmallBanner