
import axios from "axios";

export const getCProduct = async(currentUser, cart) => {

   await cart.map((c) => (
      
        axios.get("http://localhost:5000/api/carts/find/" + currentUser._id + "/" + c._id + "/" + c.color + "/" + c.size, {
            headers: { token: `Bearer ${currentUser.accessToken}` }

        }).then(
            res => {
                if (res.data === null) {
                    axios.post("http://localhost:5000/api/carts", {
                        userId: currentUser._id,
                        productId: c._id,
                        quantity: c.quantity,
                        color: c.color,
                        size: c.size,
                    }, {
                        headers: { token: `Bearer ${currentUser.accessToken}` }

                    })
                } else {

                    axios.put("http://localhost:5000/api/carts/" + currentUser._id + "/" + c._id + "/" + c.size + "/" + c.color, {
                        quantity: res.data.quantity + c.quantity
                    }, {
                        headers: { token: `Bearer ${currentUser.accessToken}` }

                    })
                }
            }
        ).catch(

        )

    )
    
    )


}
export const getCAllProduct = async(currentUser) => {
console.log( currentUser._id)
    axios.get("http://localhost:5000/api/carts/find/" + currentUser._id, {
        headers: { token: `Bearer ${currentUser.accessToken}` }
      }).then((res)=>{
      
      })
    }