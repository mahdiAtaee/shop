import React from 'react'
import * as API from '@/services/api'
import ShopLayout from '@/components/layouts/Shop'
import SingleProduct from '@/components/products/singleProduct'

const index = ({ product, comments }) => {
    return (
        <ShopLayout title="فروشگاه تک">
            <SingleProduct product={product} comments={comments} />
        </ShopLayout>
    )
}


export async function getStaticProps(context) {
    const { id } = context.params

    const product = await API.get(`/products/${id}`)
    const comments = await API.get(`/products/${id}/comments`)

    const category = product.data.category
    console.log(product.data);
    
    //const relatedProducts = await API.get(`/categories/slug/products`)

    return {
        props: {
            product: product.data,
            comments: comments.data
        }
    }

}

export async function getStaticPaths() {
    const products = await API.get('/products')

    const paths = products.data.map((product) => ({
        params: { id: product.id }
    }))

    return {
        paths,
        fallback: true,
    }
}


export default index