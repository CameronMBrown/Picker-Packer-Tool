import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// styles
import './App.css';

// components 
import OrderDatePicker from "./components/OrderDatePicker";
import PickerReport from "./components/PickerReport"
import PackerReport from "./components/PackerReport";

// utils
import { getLastDayOfPrevMonth } from "./utils";

// TODO: handle months other than september - remember end of month edge case

function App() {
  const [ ordersData, setOrdersData ] = useState(null)
  const [ lineItemsData, setLineItemsData ] = useState(null)
  const [ yesterdaysOrders, setYesterdaysOrders ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)

  document.title = "Gift Box Co. - Picker & Packer helper tool"

  /**
   * Start the app by first fetching the necessary data.
   * 
   * Using the fetch method is technically not needed, but this is meant to reflect 
   * a more realistic senario where the data is stored on a seperate server.
   * 
   * I could simply place the orders, line-items data in the /src folder and run:
   * 
   * import ORDERS from "./orders.json";
   * import LINE_ITEMS from "./line-items.json";
   */
  useEffect(() => {
    setIsLoading(true)

    // fetch mock order set for the month of September 2023
    fetch("orders.json",
      {
        headers : {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        setOrdersData(data)

        // fetch line item data 
        fetch("line-items.json",
        {
          headers : {
            'Content-type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
        .then(res => res.json())
        .then(data => {
          setLineItemsData(data)
          setIsLoading(false)
        })
      })
  }, [])

  /**
   * Gets the set of orders placed yesterday to be picked/packed today.
   * 
   * Note: the mock orders set only contains mock orders from 2023/09/01 - 2023/09/30
   * 
   * @param {String} date - "YYYY-MM-DD formated date string"
   */
  const getYesterdaysOrders = ( date ) => {
    console.log("recalculating yesterdays orders")
    console.log(date)
    // get the day, cast to int, subtract 1, convert back to string
    let yesterday = (parseInt(date.substring(8)) - 1).toString()

    // add leading zero if lost in integer conversion
    yesterday = yesterday.length === 1 ? "0" + yesterday : yesterday

    // if yesterday is "00", we want the orders from the last day of the previous month
    yesterday = yesterday === 0 ? getLastDayOfPrevMonth(date.substring(5,7)) : yesterday

    // rebuild yesterday's full date in DD/MM/YYYY format
    yesterday = yesterday + "/" + date.substring(5,7) + "/" + date.substring(0,4)

    console.log(yesterday)

    setYesterdaysOrders(
      ordersData.filter((order) => {
        return order.orderDate === yesterday
      })
    )
  }

  return (
    <div className="app-container">
      <div className="title-container">
        <h1>Gift Box Co.</h1>
        <h2>Picker & Packer helper tool</h2>
      </div>
      { isLoading ? 
        <p>Loading...</p>
        :
        <div className="ui-wrapper">
          <OrderDatePicker 
            key = {uuidv4()}
            onSelectDate = { getYesterdaysOrders }
          />
          <h2 className="report-title title-text">Orders Placed Yesterday to be Picked & Packed</h2>
          { yesterdaysOrders === null ?
            <h3 className="subtitle-text">No Orders Today</h3>
            :
            <>
              <div className="picker-report__wrapper">
                <h3 className="subtitle-text">Picker Report</h3>
                <PickerReport
                  key = {uuidv4()}
                  ordersToPick = { yesterdaysOrders }
                  lineItems = { lineItemsData }
                />
              </div>
              <div className="packer-report__wrapper">
                <h3 className="subtitle-text">Packer Report</h3>
                <PackerReport 
                  key = {uuidv4()}
                  ordersToPack = { yesterdaysOrders }
                  lineItems = { lineItemsData }
                />
              </div>
            </>
          }
        </div>
      }
    </div>
  );
}

export default App;
