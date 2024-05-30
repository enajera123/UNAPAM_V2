'use client'
import { useMainStore } from '@/store/MainStore/mainStore'
import React from 'react'

function Loader() {
    const { loader } = useMainStore()
    if (!loader) return null
    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className='min-h-screen flex items-center justify-center'>
                <div className="fixed inset-0 ">
                    <div className="absolute inset-0 bg-gray-800 opacity-60"></div>
                </div>
                <span className="loader"></span>
            </div>
        </div>
    )
}

export default Loader