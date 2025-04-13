import React, { useEffect, useState } from 'react'
import * as AUTH from '@/services/auth'
import AuthLink from '../partials/AuthLink'
import Address from './Address'

const Shipping = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    useEffect(() => {
        const authCheck = () => {
            AUTH.check()
                .then(status => setIsUserLoggedIn(status))
                .catch(error => console.log(error))
        }
        authCheck()
    }, [])

    return (
        <div className="col-md-8 order-md-1">
            <h5 className="mb-4">انتخاب آدرس ارسال</h5>
            {isUserLoggedIn ? <Address /> : <AuthLink />}
        </div>
    )
}

export default Shipping