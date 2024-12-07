import { Link, useLocation } from "react-router-dom";
import "./orderproduct.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethos";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { async } from "@firebase/util";


export default function Product() {
  const location = useLocation()
  const userId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
 
const [order, setOrder] = useState([])
const [address, setAddress] = useState("")
  

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {

      try {
        
        const res = await userRequest.get("orders/finds/"+userId);
       
     setOrder(res.data);
     setAddress(res.data.address)
     console.log(res.data)
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [userId]);
 
  const handleClick =async()=>{
    const res = await userRequest.put(`/orders/`+userId, {status2:"Complete"});
  }

  
  // const handleClick = (e) => {
    
  //   e.preventDefault();
  //   if (file !== null) {
  //     const fileName = new Date().getTime() + file.name;
  //     const storage = getStorage(app);
  //     const storageRef = ref(storage, fileName)
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         // Observe state change events such as progress, pause, and resume
  //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //           default:
  //         }
  //       },
  //       (error) => {
  //         // Handle unsuccessful uploads
  //       },
  //       () => {
  //         // Handle successful uploads on complete
  //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           
  //           const product = { ...inputs, img: downloadURL, categories: cat, size: size, color: color };
  //           updateProduct(productId, product, dispatch);
  //         });
  //       }
  //     );

  //   }else{
  //     const product = { ...inputs,categories: cat, size: size, color: color };
  //     updateProduct(productId, product, dispatch);
  //   }};

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        
          <button className="productAddButton" onClick={handleClick}>Complete Order</button>
       
      </div>
      <div className="productTop">
       
        <div className="productTopRight">
          <div className="productInfoTop">
           
            <span className="productName">Address</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
            {order.map((item)=>(
         <>     <span className="productInfoValue">{item.address}</span>
              <span className="productInfoValue">{item.createdAt}</span>

              </>
            ))}
            </div>
           

           
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
           {order.map((item)=>(
             item.products.map((p)=>(
              <><label>Product Name</label><label>{p.productId}</label><label>{"Qty: "+ p.quantity}</label><label>{"Color: "+ p.color}</label><label>{"Size: "+ p.size}</label>  </>
             ))
//  <><label>Product Name</label><input type="text" placeholder={item.products.productId+" "+item.products.quantity}  name="title" /></>

           ))}
           

          </div>

       
        </form>
      </div>
    </div>
  );
}
