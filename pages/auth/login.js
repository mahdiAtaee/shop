import React from 'react'
import AuthLayout from '@/components/layouts/Auth'

const Login = () => {
    return (
        <AuthLayout title="صفحه ورود">
            <div className="section-gap bg-gray h-screen">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12">
                            <div className="card border-0 row no-gutters flex-column flex-md-row">
                                <div className="card-body d-flex align-items-center col-lg-5 p-md-5 p-3">
                                    <div className="w-100">
                                        <img
                                            className="mb-lg-5 mb-4"
                                            src="/assets/img/logo-dark.png"
                                            srcSet="/assets/img/logo-dark@2x.png 2x"
                                            alt=""
                                        />
                                        <form>
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="آدرس ایمیل"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <div className="icon-field-right">
                                                    <i className="fa fa-eye" />
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="رمز عبور"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck1"
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor="customCheck1"
                                                    >
                                                        مرا به خاطر بسپار
                                                    </label>
                                                    <a href="#" className="text-dark float-right">
                                                        رمز عبور فراموش شده؟
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <a href="#" className="btn btn-theme">
                                                    ورود
                                                </a>
                                            </div>
                                            <div className="form-group mt-lg-5">
                                                <a href="#" className="">
                                                    ایجاد حساب جدید
                                                </a>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="flex-column col-lg-7">
                                    <div className="position-relative">
                                        <img
                                            className="card-img-right flex-grow-1 "
                                            src="/assets/img/cards/29a.jpg"
                                            alt=""
                                        />
                                        <div className="login-content">
                                            <div className="h1 login-circle-logo font-weight-800 text-primary mb-4">
                                                ک
                                            </div>
                                            <h2 className="">آن را بهتر و سریعتر کنید</h2>
                                            <p>کلاب بهترین است از نگاه مشتریان تم فارست</p>
                                            <div className="row justify-content-center mt-lg-5">
                                                <div className="col-md-8">
                                                    <ul className="list-group text-left">
                                                        <li className="list-group-item">
                                                            <i className="fa fa-check pr-3 text-primary font-size-12" />
                                                            برنامه ریزی ایده نوآوری و نسل
                                                        </li>
                                                        <li className="list-group-item">
                                                            <i className="fa fa-check pr-3 text-primary font-size-12" />{" "}
                                                            بزرگ ارزش برند جهانی محصول است
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Login