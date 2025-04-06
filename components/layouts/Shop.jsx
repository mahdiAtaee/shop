/* eslint-disable react/prop-types */
import Head from 'next/head'
import React from 'react'
import ShopHeader from '../partials/Header'
import ShopFooter from '../partials/Footer'

const Shop = ({ children, title }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
                />
                <meta name="description" content="" />
                <meta name="author" content="mahdi" />
            </Head>
            <ShopHeader />
            {children}
            <ShopFooter />
        </div>
    )
}

export default Shop