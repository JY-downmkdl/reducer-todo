import React, { useReducer } from "react";

function reducer(state, action){
    switch(action.type){
        case 'INCREMENT':
            return state+1;
        case 'DECREMENT':
            return state-1; 
        default:
            return state;
    }
}

function Counter(){
    const[number,dispatch] = useReducer(reducer, 0);
    const onIncrease = () =>{
        dispatch({type: 'INCREMENT'})
        console.log("플러스"+number);
    }
    const onDecrease = () =>{
        dispatch({type: 'DECREMENT'});
        console.log("마이너스"+number);
    }
    return(
        <div>
            <p>{number}</p>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    )
}
export default Counter;