import React from 'react'

import { Chart } from 'react-google-charts'

const DowActivityChart = () => {
  return (
    <div style={{ display: 'flex', maxWidth: 900, justifyContent: 'center' }}>
      <Chart
        // width={400}
        // width={900}
        width={450}
        // width={350}
        height='300px'
        chartType='AreaChart'
        loader={<div>Loading Chart</div>}
        data={[
          ['Time', 'Index  Avg'],
          ['10A', 35812],
          ['11A', 35861],
          ['12P', 35834],
          ['1P', 35749],
          ['2P', 35791],
          ['3P', 35839],
          ['4P', 35754],
          ['5P', 35756]
        ]}
        options={{
          title: 'DJIA',
          hAxis: { title: 'TUE', titleTextStyle: { color: '#333' } },
          vAxis: { minValue: 35000 },
          // For the legend to fit, we make the chart area smaller
          // chartArea: { width: '50%', height: '70%' }
          chartArea: { width: '50%', height: '70%' }
          // lineWidth: 25
        }}
      />
    </div>
  )
}

export default DowActivityChart
