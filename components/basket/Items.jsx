import React from 'react'
import Item from './Item'
import useAppContext from '@/context/useAppContext'

const Items = () => {
    const { state } = useAppContext()

    return (

        <div className="col-md-12">
            <div className="table-responsive">
                <table className="table vl-custom-table">
                    <thead>
                        <tr>
                            <th>نام محصول</th>
                            <th>قیمت</th>
                            <th>تعداد</th>
                            <th>مجموع</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.basket.map((item) => <Item key={item.productID} {...item} />)}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Items