/* eslint-disable react/prop-types */
import React from 'react'
import ProductItem from '../products/List/ProductItem'

const ProductItems = ({ products }) => {
    return (
        <div className='col-12 col-md-9'>
            <div className='row'>
                {products.map(product => (
                    <div className='col-6 col-md-4' key={product.id}>
                        <ProductItem {...product} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductItems