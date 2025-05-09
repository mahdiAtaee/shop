import React, { useState } from 'react'
import AuthLayout from '@/components/layouts/Auth'
import { login } from '@/services/auth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import useAppContext from '@/context/useAppContext'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const { dispatch } = useAppContext()

    const handleLogin = async (e) => {
        e.preventDefault()
        if (email.length < 1 && password.length < 1) {
            alert('ایمیل و رمزعبور اجباری می باشد')
            return false
        }
        const [result, token, user] = await login(email, password)
        if (result) {
            localStorage.setItem('token', token)
            dispatch({
                type: "SET_CURRENT_USER",
                payload: {
                    user
                }
            })
            router.push('/checkout')
        } else {
            alert('کاربری با این مشخصات در سایت پیدا نشد')
        }
    }

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
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="form-control"
                                                    placeholder="آدرس ایمیل"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <div className="icon-field-right">
                                                    <i className="fa fa-eye" />
                                                    <input
                                                        type="password"
                                                        onChange={(e) => setPassword(e.target.value)}
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
                                                <button onClick={handleLogin} className="btn btn-theme">
                                                    ورود
                                                </button>
                                            </div>
                                            <div className="form-group mt-lg-5">
                                                <Link href='/auth/register'>ثبت نام</Link>
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