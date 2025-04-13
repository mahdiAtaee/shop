import React from 'react'
import Menu from './Menu'
import useAppContext from '@/context/useAppContext'
import Link from 'next/link'

const Header = () => {
    const { state } = useAppContext()
    
    return (
        <>
            <section className="py-2 bg-gray">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <small className="font-size-14">
                                هر سوالی دارید؟ با ما تماس بگیرید: 1-222-333-4445
                            </small>
                        </div>
                        <div className="col-md-5 text-md-right">
                            <ul className="list-inline m-0 d-inline mr-2">
                                <li className="list-inline-item font-size-14">
                                    <a href="#" className="text-dark">
                                        ورود
                                    </a>
                                </li>
                                <li className="list-inline-item font-size-14 ml-2">
                                    <a href="#" className="text-dark">
                                        ایجاد حساب کاربری
                                    </a>
                                </li>
                            </ul>
                            <div className="dropdown d-inline ml-2">
                                <button
                                    className="border-0 no-bg dropdown-toggle font-size-12"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <img className="mb-1 mr-1" src="/assets/img/lang.jpg" alt="" /> USA
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-right custom-dropdown custom-dropdown-sm"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <a className="dropdown-item" href="#">
                                        ENG
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        GER
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        FRN
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        PUR
                                    </a>
                                </div>
                            </div>
                            <Link href='/basket' className="text-decoration-none text-dark ml-2">
                                <i className="vl-cart1" />
                                {state?.basket.length}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <Menu />
        </>
    )
}

export default Header