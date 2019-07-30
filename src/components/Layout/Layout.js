import React from  'react';

import Header from '../header/Header';
import VoteEngine from '../../containers/voteEngine/VoteEngine';
import classes from './Layout.css';

const Layout = () => {
    return(
        <div className={classes.Layout}>
            <Header />
            <VoteEngine />
        </div>
    )
};

export default Layout;