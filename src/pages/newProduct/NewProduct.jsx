import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const [cat, setCat] = useState([])
  const [color, setColor] = useState([])
  const [size, setSize] = useState([])
  const dispatch = useDispatch();

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
    const fileName =new Date().getTime()+file.name;
    const storage=getStorage(app);
    const storageRef =ref(storage,fileName)
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
          const product = { ...inputs, img: downloadURL, categories: cat,size:size,color:color };
          addProduct(product, dispatch);
        });
      }
    );
  };

  
  
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="description..." onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="100" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input name="categories" type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input name="color" type="text" placeholder="black" onChange={handleColor} />
         
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input name="size" type="text" placeholder="M" onChange={handleSize} />
         
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input name="inStock" type="number" placeholder="100" onChange={handleChange} />
         
        </div>

        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
