import React from 'react'
import Profit from './Profits'
import OrderedSoldProduct from './OrderedSoldProducts/index'
import OrderedSoldCategory from './OrderedSoldCategories'

function Chart() {
  return (
    <div>
    <Profit/>
    <OrderedSoldProduct/>
    <OrderedSoldCategory/>
    </div>
  )
}

export default Chart