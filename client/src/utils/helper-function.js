// export this function to use in HoldingsTable.js, BuyModal.js, and in SellModal.js

const roundAccurately = (number, decimalPlaces) =>
  Number(Math.round(`${number}e${decimalPlaces}`) + `e-${decimalPlaces}`)

module.exports = {
  roundAccurately
}
