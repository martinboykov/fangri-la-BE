function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
const yearNumber = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format;
const monthNumber = new Intl.DateTimeFormat('en-US', { month: 'numeric' }).format;

module.exports = {
  randomIntFromInterval,
  daysInMonth,
  yearNumber,
  monthNumber
};
