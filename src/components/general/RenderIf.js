import React, {Component} from 'react';

export const RenderIf = (props) => {
    if(props.condition){
        return props.children;
    } else {
        return null;
    }
}

export const RenderIfElse = (props) => {
    if(props.condition){
       return this.children[0];
    } else {
        return this.children[1];
    }
}

//<RenderCond condition={1}>
//    <RenderCond.If>
//        <True></True>
//    </RenderCond.If>
//    <RenderCond.Else>
//        <False></False>
//    </RenderCond.Else>
//</RenderCond>

export default RenderIf;