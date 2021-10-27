import React from 'react'

import './PieChart.css'

import { Chart } from 'react-google-charts'

const PieChart = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', maxWidth: 400 }}>
      <Chart
        className='pie-chart'
        // style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        // width='500px'
        // width={400}
        // MinWidth={350}
        width={450}
        // width={320} // this for media query
        height='300px'
        chartType='PieChart'
        loader={<div>Loading Chart</div>}
        // data={[
        //   ['Asset Type', 'Asset Percentage Held'],
        //   ['Domestic Stock', 11],
        //   ['Foreign Stock', 5],
        //   ['Bonds', 3],
        //   ['Short Term', 2],
        //   ['Cash', 7]
        // ]}
        data={[
          ['Asset Type', 'Asset Percentage Held'],
          ['Stock', 11],
          ['Cash', 7]
        ]}
        options={{
          title: 'Asset Allocation'
          // test
          // chartArea: { width: '50%', height: '70%' }
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  )
}

export default PieChart
