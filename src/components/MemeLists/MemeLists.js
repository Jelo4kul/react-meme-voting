import React from 'react';
import classes from './MemeLists.css'
import MemeList from './MemeList/MemeList'

const MemeLists = (props) => {
    return (
        <div className={classes.MemeLists}>
            {
                props.listOfMemes.sort((a, b) => {
                    return b.aettosAmount - a.aettosAmount;
                })
                .map((meme) => {
                    return <MemeList
                                key={meme.id}
                                name={meme.name}
                                image={meme.image}
                                aettosAmount={meme.aettosAmount} 
                                value={meme.value}
                                changed={props.inputChanged.bind(this, meme.id)}
                                clicked={props.voteClicked.bind(this, meme.id)}/>
                })
            }
        </div>
    )
};

export default MemeLists;