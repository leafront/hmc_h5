export function MoneyByTenThousand(moneyCount){
  moneyCount = (Math.floor(moneyCount / 100) / 100).toFixed(2)
  return moneyCount
}

export function ConvertDistanceToKm(distance){
  distance = (Math.floor(distance / 100) / 10).toFixed(2)
  return distance
}

export function DiscountCualculator(orgPrice, discountPrice){
  let priceDiscountPercent = discountPrice / orgPrice || 0
  priceDiscountPercent = Math.floor(priceDiscountPercent * 100) / 10
  // console.log(priceDiscountPercent,discountPrice ,orgPrice)
  return priceDiscountPercent
}
