import React, {useState, useEffect} from 'react';
import './Nav.css'

function Nav() {

    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    return (
        // ${show && "nav__black"}
        <div className={`nav ${show && "nav__black"}`}>
            <img 
                className="nav__logo" 
                src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                alt="netflix_logo" 
            />

            <img 
                className="nav__avatar" 
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="netflix_avatar" 
            />
        </div>
    )
}

export default Nav
