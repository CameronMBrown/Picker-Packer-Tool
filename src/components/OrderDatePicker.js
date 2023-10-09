import React, { useState } from "react";

// styles
import "./OrderDatePicker.css";

/*
Note: 
Purely for the sake of simplifying this project and ensuring that every selected date
returns at least one valid order, the date-picker will only allow the user to select
a date within September 2023. This is because the mock order set only contains example
orders for September 2023. The rest of the logic within this app could handle any date.
*/

const OrderDatePicker = ({ onSelectDate }) => {
   const [ date, setDate ] = useState('2023-09-01');

   const selectDateHandler = ( selectedDate ) => {
      onSelectDate(selectedDate.target.value)
      setDate(selectedDate.target.value)
   }

   return (
      <>
         <div className="date-picker-wrapper">
            <h3>Get report for day: </h3>
            <input 
               type = "date"
               className="order-date-picker"
               min = "2023-09-01"
               max = "2023-09-30"
               value = { date }
               onChange = { selectDateHandler } 
            />
         </div>
         <hr className="ui-divider"></hr>
      </>
   )
}

export default OrderDatePicker;

