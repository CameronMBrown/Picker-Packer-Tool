import React from "react";
import { v4 as uuidv4 } from 'uuid';

const OrderSummary = ({ order, lineItems }) => {

   return (
      <ol className="packer-row__contents" type="i" >
         <li className="packer-row__order-date" >Order Date: {order.orderDate.toLocaleString()}</li>
         <li className="packer-row__line-items-header" >Line Items:</li>
         <ol className="packer-row__boxes">
            { order.products.map((product) => {
               return (
                  <div key={uuidv4()}>
                     <li>{product.productName}</li>
                     <ol className="packer-row__box-contents" type="a" >
                        {/* find the line item that matches the current order item and list products */}
                        {
                           lineItems.filter((box) => box.name === product.productName)[0].products.map((item) => { 
                              return <li key={uuidv4()}>{item.name}</li>
                           })
                        }
                     </ol>
                  </div> 
               )
            })}
         </ol>
         <li>Ships To:</li>
         <ol className="packer-row__shipping-info">
            <li>{order.customerName}</li>
            <li>{order.shippingAddress}</li>
         </ol>
      </ol>
   )
}

export default OrderSummary;