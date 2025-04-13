import React from 'react'
import BasketList from './BasketList'
import Shipping from './Shipping'

const index = () => {
    return (
        <section className="section-gap">
            <div className="container">
                <div className="row">
                    <BasketList />
                    <Shipping />
                </div>
            </div>
        </section>

    )
}

export default index