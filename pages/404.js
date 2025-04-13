import React from 'react'
import Link from 'next/link'
import ShopLayout from '@/components/layouts/Shop'

const NotFound = () => {
    return (
        <ShopLayout title="صفحه یافت نشد">
            <section className="section-gap section-top ">
                <div className="container">
                    <div className="row justify-content-md-center align-items-center text-lg-left text-center">
                        <div className="col-md-4">
                            <img className="mb-lg-0 mb-5" src="/assets/img/error-icon.png" alt="" />
                        </div>
                        <div className="col-md-5 pl-lg-5">
                            <h1 className="font-size-60 text-primary">خطای 404</h1>
                            <p>با عرض پوزش صفحه پیدا نشد</p>
                            <Link href="/products" className="btn btn-pill btn-theme">
                                برگشت به صفحه اصلی
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </ShopLayout>
    )
}

export default NotFound