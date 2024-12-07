import { publicRequest} from "../requestMethos";
import { getCProduct,getCAllProduct } from "../test";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login =async (dispatch,user,cart)=>{
    dispatch(loginStart());
    try {
        const res =await publicRequest.post("/auth/login",user)
        await getCProduct(res.data,cart)
        dispatch(loginSuccess(res.data))
       
        getCAllProduct(res.data);
        
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const register =async (user)=>{
    try {
        const res =await publicRequest.post("/auth/register",user);
       console.log(res);
    } catch (error) {
       alert(error)
    }
}