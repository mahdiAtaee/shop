/* eslint-disable react/prop-types */
import React from 'react'
import SingleHeader from './Header'
import Gallery from './components/Gallery'
import Details from './components/Details'
import Description from './components/Description'
import Attributes from './components/Attributes'
import Comments from './components/Comments'


const SingleProduct = ({ product, comments }) => {
    return (
        <>
            <SingleHeader />
            <section className="section-gap bg-white">
                <div className="container">
                    <div className="row justify-content-between mb-lg-5 mb-4">
                        <div className='col-md-6'>
                            <Gallery images={product.gallery} />
                        </div>
                        <div className='col-md-5'>
                            <Details product={product} />
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className='col-md-12'>
                            <ul className="nav nav-line mb-md-5 mb-3" role="tablist">
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        id="branding-tab"
                                        data-toggle="tab"
                                        href="#branding"
                                        role="tab"
                                        aria-controls="branding"
                                        aria-selected="true"
                                    >
                                        توضیحات
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        id="ui-tab"
                                        data-toggle="tab"
                                        href="#ui"
                                        role="tab"
                                        aria-controls="ui"
                                        aria-selected="false"
                                    >
                                        مشخصات
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        id="frontend-tab"
                                        data-toggle="tab"
                                        href="#frontend"
                                        role="tab"
                                        aria-controls="frontend"
                                        aria-selected="false"
                                    >
                                        نظرات 2
                                    </a>
                                </li>
                            </ul>
                            <div className='tab-content text-left'>
                                <Description />
                                <Attributes attributes={product.attributes} />
                                <Comments comments={comments} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default SingleProduct