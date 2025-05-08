/* eslint-disable react/prop-types */
import React from 'react'
import ProductItem from '../products/List/ProductItem'

const ProductItems = ({ products }) => {
    return (
        <div className='col-12 col-md-9'>
            <div className='row'>
                {products.map(product => (
                    <ProductItem {...product} key={product.id} />
                ))}
            </div>
        </div>
    )
}

export default ProductItems