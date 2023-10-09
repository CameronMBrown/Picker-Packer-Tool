import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// components
import Card from "../UI/Card";
import OrderSummary from "./OrderSummary";

// styles
import "./PackerReport.css";

const PackerReport = ({ ordersToPack, lineItems }) => {
   const [ view, setView ] = useState("list");
   const [ currentOrder, setCurrentOrder ] = useState(null)
   const [ stepCount, setStepCount ] = useState(null)


   const handleSetView = (e) => {
      setView(e.target.value)
   }

   const handleNextOrder = () => {
      setStepCount((prev) => prev + 1)
   }

   const handlePrevOrder = () => {
      setStepCount((prev) => prev - 1)
   }

   // reset stepCount when new data is recieved
   useEffect(() => {
      if (ordersToPack === null || ordersToPack === undefined) return
      setStepCount(0)
   }, [ ordersToPack ])

   useEffect(() => {
      if (stepCount === null || stepCount === undefined ) return
      console.log("new current order")

      setCurrentOrder(ordersToPack[stepCount])
   }, [ stepCount ])

   return (
      <>
         <Card className="packer-report">
            { (ordersToPack && view === "list") && 
               ordersToPack.map((order, i) => {
                  return (
                     <div key={uuidv4()} className="packer-row">
                        <h3 className="packer-row__order-header" >Order #{i+1}</h3>
                        <OrderSummary 
                           order = { order } 
                           lineItems = { lineItems }
                        />
                     </div>
                  )
               })
            }
            { (ordersToPack && view === "steps") &&
               <>
                  <h3 className="packer-report__step-header">Order 
                     <span style={{ fontWeight: 'bold' }}> {stepCount+1} </span> 
                     of {ordersToPack.length}</h3>
                  <div className="packer-row">
                     <h3 className="packer-row__order-header">Order - {currentOrder.orderID}</h3>
                     <OrderSummary 
                        order = { currentOrder } 
                        lineItems = { lineItems }
                     />
                  </div>
                  <div className="prev-next-btns-container">
                     { stepCount < ordersToPack.length - 1 && 
                        <button className="packer-btn next" onClick={handleNextOrder}>Next</button>
                     }
                     { stepCount > 0 &&
                        <button className="packer-btn prev" onClick={handlePrevOrder}>Prev</button>
                     }
                  </div>
               </>
            }
         </Card>
         { view === "steps" && 
            <button className="packer-report__list-btn packer-btn" value="list" onClick={handleSetView}>List View</button>
         }
         { view === "list" && 
            <button className="packer-report__step-btn packer-btn" value="steps" onClick={handleSetView}>Step-by-Step View</button>
         }
      </>
   )
}

export default PackerReport;