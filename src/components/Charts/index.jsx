import React from 'react'
import Profit from './Profits'
import OrderedSoldProduct from './OrderedSoldProducts/index'
import OrderedSoldCategory from './OrderedSoldCategories'
import styles from './styles.module.scss'

function Chart() {
  return (
    <div>
    <Profit/>
    <div className={styles.chartContainer}>
    <OrderedSoldProduct/>
    <OrderedSoldCategory/>
    </div>
    </div>
  )
}

export default Chart