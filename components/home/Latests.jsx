/* eslint-disable react/prop-types */
import React from 'react'
import Card from './Card';
import Image from 'next/image';


const Latests = ({ products }) => {
  return (
    <>
      <section className="mt-md-0 p-md-4">
        <Card products={products} title="آخرین" />
      </section>
      <section className='mt-md-0 p-md-4'>
              <div className='small-banner my-2'>
                <Image src="/assets/img/banner/banner-5.gif" className='object-cover' fill alt='banner' />
              </div>
              <div className='small-banner'>
                <Image src="/assets/img/banner/banner-6.gif" className='object-cover' fill alt='banner' />
              </div>
      </section>
    </>

  )
}

export default Latests