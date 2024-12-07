import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethos";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function Product() {
  const location = useLocation()
  const productId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const product = useSelector(state => state.product.products.find(product => product._id === productId))
  const [pStats, setpStats] = useState([])
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState(product.categories)
  const [color, setColor] = useState(product.color)
  const [size, setSize] = useState(product.size)



  const [image, setImage] = useState(product.img)
  

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
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id
        })
        list.map((item) =>
          setpStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);
  const handleChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  }
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  }
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  }
  const handleClick = (e) => {
    
    e.preventDefault();
    if (file !== null) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
           
            const product = { ...inputs, img: downloadURL, categories: cat, size: size, color: color };
            updateProduct(productId, product, dispatch);
          });
        }
      );

    }else{
      const product = { ...inputs,categories: cat, size: size, color: color };
      updateProduct(productId, product, dispatch);
    }};

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={product.title} onChange={handleChange} name="title" />
            <label>Product Description</label>
            <input type="text" placeholder={product.desc} onChange={handleChange} name="desc" />
            <label>Product Price</label>
            <input type="text" placeholder={product.price} onChange={handleChange} name="price" />
            <label>In Stock</label>
            <input type="text" placeholder={product.inStock} onChange={handleChange} name="inStock" />
            <label>Categories</label>
            
            <input type="text" placeholder={product.categories} onChange={handleCat} name="categories"  />
            <label>Color</label>
            <input type="text" placeholder={product.color} onChange={handleColor} name="color" />
            <label>Size</label>
            <input type="text" placeholder={product.size} onChange={handleSize} name="size" />

          </div>

          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />

              <input type="file" id="file" onChange={e => setFile(e.target.files[0])
              } />

              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton" onClick={handleClick}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
