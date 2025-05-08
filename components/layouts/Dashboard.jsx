/* eslint-disable react/prop-types */
import React, { useLayoutEffect } from 'react'
import Head from 'next/head'
import ShopHeader from '../partials/Header'
import ShopFooter from '../partials/Footer'
import ActiveLink from '../partials/ActiveLink'
import useAppContext from '@/context/useAppContext'
import { useRouter } from 'next/router'
import { check as authCheck } from '@/services/auth'

const Dashboard = ({ title, children }) => {
  const router = useRouter()
  const { dispatch } = useAppContext()
  useLayoutEffect(() => {
    authCheck().then(isUserLoggedIn => !isUserLoggedIn ? router.push('/auth/login') : null).catch(error => console.error(error))
  }, [])
  const handleLogOut = () => {
    localStorage.removeItem('token')
    dispatch({
      type: 'LOGOUT',
      payload: {}
    })
    router.push('/')
  }
  return (
    <div className='d-flex flex-column min-dvh-100 bg-gray'>
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
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-3 col-lg-2'>
            <div className="list-group list-group-gap list-group-right-arrow list-group-right-arrow-on-hover bg-white">
              <ActiveLink href="/dashboard" containerClass="list-group-item border-0">
                داشبورد
              </ActiveLink>
              <ActiveLink href="/dashboard/orders" containerClass="list-group-item border-0">
                سفارشات
              </ActiveLink>
              <ActiveLink href="/dashboard/profile" containerClass="list-group-item border-0">
                پروفایل
              </ActiveLink>
              <ActiveLink href="/dashboard/addresses" containerClass="list-group-item border-0">
                آدرس‌ها
              </ActiveLink>
              <a onClick={handleLogOut} className="list-group-item border-0">
                خروج
              </a>
            </div>
          </div>
          <div className='col-md-9 col-lg-10'>
            {children}
          </div>
        </div>
      </div>
      <ShopFooter />
    </div>
  )
}

export default Dashboard