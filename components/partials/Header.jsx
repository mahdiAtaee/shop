import React from 'react'
import Menu from './Menu'
import useAppContext from '@/context/useAppContext'
import Link from 'next/link'
import Image from 'next/image'

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
                        <div className="col-md-5 text-md-right d-flex align-items-center justify-content-md-end">
                            {!state.user.id ? (
                                <ul className="list-inline m-0 d-inline mr-2">
                                    <li className="list-inline-item font-size-14">
                                        <Link href="/auth/login" className="text-dark">
                                            ورود
                                        </Link>
                                    </li>
                                    <li className="list-inline-item font-size-14 ml-2">
                                        <Link href="/auth/register" className="text-dark">
                                            ایجاد حساب کاربری
                                        </Link>
                                    </li>
                                </ul>
                            ) : (
                                <div className="dropdown d-inline ml-2">
                                    <button
                                        className="border-0 no-bg dropdown-toggle font-size-12 d-flex align-items-center"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <Image className="mb-1 mr-1 rounded-circle" src={state && state.user.avatar} width={30} height={30} alt={state && state.user.firstName} />
                                        {state && state.user.firstName}
                                    </button>
                                    <div
                                        className="dropdown-menu dropdown-menu-right custom-dropdown custom-dropdown-sm"
                                        aria-labelledby="dropdownMenuButton"
                                    >
                                        <Link className="dropdown-item" href="/dashboard">
                                            داشبورد
                                        </Link>
                                    </div>
                                </div>
                            )}

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