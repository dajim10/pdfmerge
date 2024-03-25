import React from 'react'
import Logo from '../assets/aritLogo.png'

const Footer = () => {
    return (
        <footer className="footer fixed-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center ">
                        <img src={Logo} alt="arig logo" width={100} />
                        <p >&copy; Copyright 2024 สำนักวิทยบริการและเทคโนโลยีสารสนเทศ</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer