export function addDays(date, days) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

let currentDate = new Date();
let newDate = addDays(currentDate, 5);
console.log(newDate);
