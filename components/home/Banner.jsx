import React from 'react'
import Image from 'next/image'

const Banner = () => {
    return (
        <section className='section-gap mt-md-0 p-md-4'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <div className='small-banner'>
                            <Image src="/assets/img/banner/small-banner-1.webp" className='object-cover' fill alt='banner' />
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='small-banner'>
                            <Image src="/assets/img/banner/small-banner-2.webp" className='object-cover' fill alt='banner' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner