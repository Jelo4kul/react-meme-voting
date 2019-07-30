import React from 'react';
import classes from './Header.css'

const Header = () => {
    return (
        <div className={classes.Header}>
            <h1 style={{color: "white"}}>Meme Voting</h1>
        </div>);
}

export default Header;