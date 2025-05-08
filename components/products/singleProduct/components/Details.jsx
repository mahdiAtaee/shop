/* eslint-disable react/prop-types */
import useAppContext from '@/context/useAppContext'
import React, { useEffect, useState } from 'react'
import * as _ from 'lodash'
import { toPersianNumber } from '@/services/lang'

const Details = ({ product }) => {
    const [itemCount, setItemCount] = useState(1)
    const [variations, setVariations] = useState([])
    const [price, setPrice] = useState({ main: product.price, discounted: product.discountedPrice })
    const { dispatch } = useAppContext()

    useEffect(() => {
        const checkPriceVariations = () => {

            const matchedPriceVariations = product.priceVariations.filter(priceVariation => {
                return _(priceVariation.items).xorWith(variations, _.isEqual).isEmpty()
            })

            if (matchedPriceVariations.length > 0) {
                setPrice({ main: matchedPriceVariations[0].price, discounted: 0 })
            }
        }
        checkPriceVariations()

    }, [variations])


    const addVariation = (e, title) => {
        const selectedVariation = e.target.value

        if (selectedVariation != 0) {
            const newItem = { [title]: selectedVariation };

            const existingIndex = variations.findIndex(item => Object.keys(item)[0] === title);

            if (existingIndex !== -1) {
                // مقدار رو آپدیت کن
                const updated = [...variations];
                updated[existingIndex] = newItem;
                setVariations(updated);
            } else {
                // آیتم جدید اضافه کن
                setVariations([...variations, newItem]);
            }
            console.log(variations);
        }
    }

    const AddToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            payload: {
                productID: product.id,
                price: price.main,
                discountedPrice: price.discounted,
                title: product.title,
                thumbnail: product.thumbnail,
                count: itemCount,
                variation: variations
            }
        })
    }

    return (
        <>
            <h3 className="mb-3">{product.title}</h3>
            <div className="price mb-4">
                {price.discounted != 0 ? (
                    <>
                        <del className="text-muted mr-2">
                            <span className="h6">{toPersianNumber(price.main)} تومان</span>
                        </del>
                        <span className="h5">{toPersianNumber(price.discounted)} تومان</span>
                    </>
                ) : (
                    <span className="h5">{toPersianNumber(price.main)} تومان</span>
                )}
            </div>
            <p className="text-muted">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
                طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و
                با استفاده از طراحان گرافیک استلورم ایپسوم متن ساختگی با تولید سادگی نامفهوم
                از صنعت چاپ و با استفاده از طراحان گرافیک است
            </p>
            <form className="form-inline my-lg-5 mb-4">
                {
                    product.variations.map((variation, index) => (
                        <div key={index} className="form-group mx-2 mb-4">
                            <select className="custom-select" onChange={e => addVariation(e, variation.title)}>
                                <option selected value={0}>{variation.name}</option>
                                {variation.items.map((item, index) => (
                                    <option value={item.value} key={`item-${index}`}>{item.title}</option>
                                ))}
                            </select>
                        </div>
                    ))
                }

                <div className='form-group'>
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
                </div>
            </form >
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