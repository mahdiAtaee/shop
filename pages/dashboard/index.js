import Dashboard from '@/components/layouts/Dashboard'
import React from 'react'

const dashboard = () => {
    return (
        <Dashboard title="داشبورد">
            <div className='container'>
                <h1 className='text-center'>داشبورد</h1>
                <p className='text-center'>به داشبورد خود خوش آمدید!</p>
            </div>
        </Dashboard>
  )
}

export default dashboard