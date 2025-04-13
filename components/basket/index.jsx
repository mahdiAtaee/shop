import React from 'react'
import Items from './Items'
import Coupon from './Coupon'
import Details from './Details'

const Basket = () => {
    return (
        <section className="section-gap">
            <div className="container">
                <div className="row">
                    <Items />
                </div>
                <div className="row">
                    <Coupon />
                    <Details />
                </div>
            </div>
        </section>

    )
}

export default Basket