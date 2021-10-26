import React from 'react'

import { Chart } from 'react-google-charts'

const MarketActivityChart = () => {
  return (
    <div style={{ display: 'flex', maxWidth: 900 }}>
      <Chart
        // width={400}
        width={900}
        height='300px'
        chartType='AreaChart'
        loader={<div>Loading Chart</div>}
        // data={[
        //   ['Time', 'Index  Average'],
        //   ['11A', 35861.40],
        //   ['1P', 35749.52],
        //   ['3P', 35839.81],
        //   ['5P', 35756.88]
        // ]}
        data={[
          ['Time', 'Index Avg. (in Thousandths)'],
          ['11A', 35.861],
          ['1P', 35.749],
          ['3P', 35.839],
          ['5P', 35.756]
        ]}
        options={{
          title: 'DJIA',
          hAxis: { title: 'TUE', titleTextStyle: { color: '#333' } },
          vAxis: { minValue: 0 },
          // For the legend to fit, we make the chart area smaller
          // chartArea: { width: '50%', height: '70%' }
          chartArea: { width: '50%', height: '70%' }
          // lineWidth: 25
        }}
      />
    </div>
  )
}

export default MarketActivityChart
