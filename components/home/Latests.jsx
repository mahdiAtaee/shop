/* eslint-disable react/prop-types */
import React from 'react'
import Card from './Card';
import Image from 'next/image';


const Latests = ({ products }) => {
  return (
    <>
      <section className="section-gap mt-md-0 p-md-4">
        <Card products={products} title="آخرین" />
      </section>
      <section className='section-gap mt-md-0 p-md-4'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='small-banner'>
                <Image src="/assets/img/banner/banner-5.gif" className='object-cover' fill alt='banner' />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='section-gap mt-md-0 p-md-4'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='small-banner'>
                <Image src="/assets/img/banner/banner-6.gif" className='object-cover' fill alt='banner' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  )
}

export default Latests