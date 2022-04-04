import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/images/icon-mspaint.png';
import './style.css';

/**
 * Header Component: display application info and description 
 */
const Header: React.FC = ( ) => {


    const navigate = useNavigate();
	
	const returnToHome = () => {
		navigate('/home');
	} 

    return (
       
        <header id="header">
			<span className="avatar" onClick={returnToHome}>
				<img src={logo} alt="WebGallery header Logo" /> 
			</span><h1 onClick={returnToHome}><strong>Paint Web Gallery</strong></h1>
			<h1 id="category"><strong>  </strong></h1>
			<h2>Save and show online your drawings from mspaintweb</h2>
				
		</header>

      
    );    
};

export default Header;