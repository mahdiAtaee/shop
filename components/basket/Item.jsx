import useAppContext from '@/context/useAppContext'
import Image from 'next/image'
import React from 'react'

const Item = (product) => {
    const { dispatch } = useAppContext()

    const handleChangeCount = (e) => {        
        dispatch({
            type: "UPDATE_BASKET_ITEM_COUNT",
            payload: {
                productID: product.productID,
                count: e.target.value
            }
        })
    }

    const handleDeleteItem = (e) => {
        e.preventDefault()
        dispatch({
            type: "REMOVE_BASKET_ITEM",
            payload: {
                productID: product.productID
            }
        })
    }

    return (
        <tr>
            <td>
                <div className="d-flex align-items-center">
                    <a href="#" className="mr-4">
                        <Image
                            className="rounded"
                            width="100"
                            height="100"
                            src={product.thumbnail}
                            alt="" />
                    </a>
                    <a href="#" className="text-dark">{product.title}</a>
                </div>
            </td>
            <td>
                <strong>{product.discountedPrice} تومان</strong>
            </td>
            <td>
                <input type="number" className="form-control w-50" min={1} max={10} onChange={handleChangeCount} defaultValue={product.count} />
            </td>
            <td>
                <strong>{product.discountedPrice * product.count} تومان</strong>
            </td>
            <td>
                <a onClick={handleDeleteItem} className="text-decoration-none h5"><i className="vl-cross-circle"></i></a>
            </td>
        </tr>
    )
}

export default Item