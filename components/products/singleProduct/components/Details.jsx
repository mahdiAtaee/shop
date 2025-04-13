/* eslint-disable react/prop-types */
import useAppContext from '@/context/useAppContext'
import React, { useState } from 'react'

const Details = ({ product }) => {
    const [itemCount, setItemCount] = useState(1)
    const { dispatch } = useAppContext()

    const AddToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            payload: {
                productID: product.id,
                price: product.price,
                discountedPrice: product.discountedPrice,
                title: product.title,
                thumbnail: product.thumbnail,
                count: itemCount
            }
        })
    }

    return (
        <>
            <h3 className="mb-3">{product.title}</h3>
            <div className="price mb-4">
                <del className="text-muted mr-2">
                    <span className="h6">{product.price} تومان</span>
                </del>
                <span className="h5">{product.discountedPrice} تومان</span>
            </div>
            <p className="text-muted">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
                طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                با استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                از صنعت چاپ و با استفاده از طراحان گرافیک است
            </p>
            <form className="form-inline my-lg-5 mb-4">
                <input
                    type="number"
                    className="form-control form-qty mr-2 w-25"
                    placeholder={1}
                    onChange={() => { setItemCount(prev => (prev + 1)) }}
                />
                <button type="button" onClick={AddToBasket} className="btn btn-primary">
                    <i className="fa fa-shopping-cart pr-3" />
                    افزودن به سبد خرید
                </button>
            </form>
            <div className="card border-0 font-size-14">
                <div className="">
                    <strong className="pr-2">تعداد:</strong> {product.stock}
                </div>
                <div className="">
                    <strong className="pr-2">دسته:</strong>
                    <a href="#" rel="tag">
                        {product.category.title}
                    </a>
                </div>
            </div>
        </>
    )
}

export default Details