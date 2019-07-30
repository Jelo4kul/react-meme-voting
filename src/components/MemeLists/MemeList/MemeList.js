import React from 'react';
import classes from './MemeList.css'

const MemeList = (props) => {
    return(
        <div className={classes.MemeList}>
            <p style={{fontWeight: "bold", fontSize: "15px"}}>{props.name}</p>
            <img className={classes.Img} src={props.image} alt={props.name}/>
            <p>{props.aettosAmount}  Aettos</p>
            <input 
                type="number" 
                name="vote-amount" 
                placeholder="Amount of aeons"
                onChange={props.changed}
                value={props.value}/>
            <button onClick={props.clicked}>Vote</button>
        </div>
    )
};

export default MemeList;