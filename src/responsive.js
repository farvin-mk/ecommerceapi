import {css} from "styled-components"
export const mobile =(props)=>{
return css `
@media only screen and (max-width:680px){
    ${props}
}
`; 
};

export const mobile2 =(props)=>{
    return css `
    @media only screen and (max-width:880px){
        ${props}
    }
    `; 
    };