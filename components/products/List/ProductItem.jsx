import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ProductItem = (product) => {
    const isSpecialOffer = (price, discountedPrice) => {
        return discountedPrice && discountedPrice > 0 && discountedPrice < price
    }
    return (
        <div className="col-md-12">
            <div className="card product border-0 mb-4 box-hover">
                <div className="position-relative">
                    {isSpecialOffer(product.price, product.discountedPrice) && <div className="ft-tag ft-inside-tr">ویژه</div>}
                    <Image
                        className="card-img-top"
                        src={product.thumbnail}
                        alt="card image"
                        width={200}
                        height={350}
                    />
                </div>
                <div className="card-body py-4 text-center">
                    <h6 className="mb-2 font-size-16">
                        <Link href={`/products/${product.id}`}>
                            {product.title}
                        </Link>
                    </h6>
                    <div className="price mb-3">
                        <del className="text-muted mr-2">
                            <span className="font-size-14 h6">{product.price} تومان</span>
                        </del>
                        <span className="h6">{product.discountedPrice} تومان</span>
                    </div>
                    <a href="#" className="btn btn-sm btn-pill btn-outline">
                        افزودن به سبد خرید
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ProductItem