import "./widgetLg.css";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethos";
import { format } from "timeago.js";

export default function WidgetLg() {
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
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((order)=>(
        <tr className="widgetLgTr" key={order._id}>
          <td className="widgetLgUser">
            <span className="widgetLgName">{order.userId}</span>
          </td>
          <td className="widgetLgDate">{format(order.createdAt)}</td>
          <td className="widgetLgAmount">Rs.{order.amount}</td>
          <td className="widgetLgStatus">
            <Button type={order.status} />
          </td>
        </tr>
         ))}
      </table>
    </div>
  );
}
