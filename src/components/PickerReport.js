import React, { useState, useEffect } from "react";

// components 
import Card from "../UI/Card";

// styles 
import "./PickerReport.css"

const zeroCountState =          
[
   {name: "Red Roses Bouquet",   count: 0},
   {name: "Box of chocolates",   count: 0},
   {name: "Love card",           count: 0},
   {name: "Women's perfume",     count: 0},
   {name: "Birthday cupcake",    count: 0},
   {name: "$100 Visa Gift Card", count: 0},
   {name: "Birthday card",       count: 0},
   {name: "Bottle of wine",      count: 0},
   {name: "Fruit basket",        count: 0},
   {name: "Pen",                 count: 0}
]

const PickerReport = ({ ordersToPick, lineItems }) => {
   const [ productsCount, setProductsCount ] = useState(zeroCountState)

   useEffect(() => {
      const runningCount = structuredClone(zeroCountState)

      /**
       * Resets the productsCount state to the zero state
       */
      const resetProductCount = () => {
         console.log("reseting daily count")
         setProductsCount(zeroCountState)
      }

      /**
       * Parses the orders array and sets the productCount state.
       * 
       * @param {Array} oders - .json order data pre-sorted by day
       */
      const getProductCount = ( orders ) => {
         // no valid orders recieved guard clause 
         if (orders === null || orders === undefined) return

         for ( const order of orders ) {
            for ( const box of order.products ) {
               let lineItemProducts

               switch (box.productName) {
                  case "Valentines Box":
                     // get the list of products contained in the line item by finding the matching line item name
                     lineItemProducts = lineItems.find((lineItem) => lineItem.name === "Valentines Box").products.map((product) => product.name)
                     icrementProductCount(lineItemProducts);
                     break
                  case "Birthday Box":
                     lineItemProducts = lineItems.find((lineItem) => lineItem.name === "Birthday Box").products.map((product) => product.name)
                     icrementProductCount(lineItemProducts);
                     break
                  case "Client Gift Box":
                     lineItemProducts = lineItems.find((lineItem) => lineItem.name === "Client Gift Box").products.map((product) => product.name)
                     icrementProductCount(lineItemProducts);
                     break
                  // no default
               }
            }
         }
         setProductsCount(runningCount)
      }

      /**
       * Each occurance of a string in the input array will increment 
       * the matching product's count by one.
       * 
       * @param {Array} productNames 
       */
      const icrementProductCount = ( productNames ) => {
         for (const product of runningCount) {
            for (const productName of productNames) {
               if (productName === product.name) {
                  product.count++
               }
            }
         }
      }

      // insure each daily report starts at the zero state
      resetProductCount()

      // build report based on yesterdays orders to be picked
      getProductCount(ordersToPick)
   }, [ordersToPick, lineItems])

   return (
      <Card className="picker-report">
         { productsCount.map(( product, i ) => {
            return (
               product.count > 0 && // only display products with "to be picked" count of at least 1
               (
                  <div className="picker-row" key={'picker-' + i}>
                     <input type="checkbox" id={product.name} value={product.name} />
                     <span className="parentheses">(</span>
                     <span style={{ fontWeight: 'bold' }}>{product.count}</span>
                     <span className="parentheses">)</span>
                     {product.name}
                  </div>
               )
            )
         }) }
      </Card>
   )
}

export default PickerReport;