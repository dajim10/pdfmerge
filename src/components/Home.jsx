import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PdfMerge from './Merge';


const Home = () => {
    const token = sessionStorage.getItem('token')
    const navigate = useNavigate();

    useEffect(() => {

        const checkToken = async () => {
            const { data } = await fetch(`https://api.rmutsv.ac.th/token/${token}`)
            console.log(data)
        }

        if (!token) {
            navigate('/login')
        } else {
            checkToken();
        }

    }
        , [token])


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>

                    <PdfMerge />

                </div>
            </div>

        </div>
    )
}

export default Home