import React from 'react'

import { Chart } from 'react-google-charts'

const SAndPActivityChart = () => {
  return (
    <div style={{ display: 'flex', maxWidth: 900, justifyContent: 'center' }}>
      <Chart
        width={450}
        height='300px'
        chartType='AreaChart'
        loader={<div>Loading Chart</div>}
        data={[
          ['Time', 'Index  Avg'],
          ['10A', 4587.14],
          ['11A', 4594.97],
          ['12P', 4585.22],
          ['1P', 4575.72],
          ['2P', 4579.68],
          ['3P', 4583.93],
          ['4P', 4574.47]
        ]}
        options={{
          title: 'S&P 500',
          hAxis: { title: 'TUE, OCTOBER 27, 2021', titleTextStyle: { color: '#333' } },
          vAxis: { minValue: 4500 },
          colors: ['green', '#004411'],
          chartArea: { width: '50%', height: '70%' }
        }}
      />
    </div>
  )
}

export default SAndPActivityChart
