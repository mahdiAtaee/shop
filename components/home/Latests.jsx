/* eslint-disable react/prop-types */
import React from 'react'
import ProductItem from '../products/List/ProductItem';

const Latests = ({ products }) => {
  return (
    <section className="section-gap">
      <div className="container">
        <div className='row justify-content-center align-items-center w-full h-40 line-height-4'>
          <p>جدیدترین محصولات</p>
        </div>
        <div className='row justify-content-center'>
                    {products && products.map(product => (<ProductItem {...product} key={product.id} />))}
                </div>
      </div>
    </section>
  )
}

export default Latests