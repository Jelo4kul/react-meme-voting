import React from 'react';
import Auxilliary from '../../hoc/withAuxilliary';
import classes from './MemeCreator.css'

const MemeCreator = (props) => {
    return (
        <div className={classes.MemeCreator}>
            <form>
                <div className={classes.Inner}>
                    <input type='text' name='meme-url' onChange={props.urlChanged} value={props.value.imageUrl} placeholder='Input Meme Url' />
                    <input type='text' name='username' onChange={props.nameChanged} value={props.value.name} placeholder='Username' />
                </div>

            </form>
            <button onClick={props.createMemeClicked}>Create Meme</button>
        </div>

    );
}

export default MemeCreator;