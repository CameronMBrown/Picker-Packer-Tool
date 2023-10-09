export const getLastDayOfPrevMonth = ( month ) => {
   switch(month) {
      case "02":
         return "28"
      case "04":
      case "06":
      case "09":
      case "11":
         return "30"
      default:
         return "31"
   }
}