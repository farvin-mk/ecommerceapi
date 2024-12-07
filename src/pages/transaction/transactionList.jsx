import "./widgetLg.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethos";
import { format } from "timeago.js";

export default function ProductList() {
  const [orders, setorders] = useState([])

  useEffect(() => {
    const getOrders= async()=>{
      try{
      const res =await userRequest.get("orders")
      setorders(res.data)
      }catch{}
    };
    getOrders();
  }, []);

  const Button = ({ type,id}) => {
    return <Link to={"/orderproduct/" +id}><button className={"widgetLgButton " + type} >{type}</button></Link>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Payment</th>
          <th className="widgetLgTh">Order Status</th>
        </tr>
        {orders.map((order)=>(
        <tr className="widgetLgTr" key={order._id}>
          <td className="widgetLgUser">
            <span className="widgetLgName">{order.userId}</span>
          </td>
          <td className="widgetLgDate">{order.createdAt}</td>
          <td className="widgetLgAmount">Rs.{order.amount}</td>
          <td className="widgetLgStatus">
            <Button type={order.status} id={order._id} />
          </td>
          <td className="widgetLgStatus">
            <Button type={order.status2}  />
          </td>
        </tr>
         ))}
      </table>
    </div>
  );
}
