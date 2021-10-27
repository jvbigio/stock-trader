import React from 'react'
import './DowActivityChart.css'

import { Chart } from 'react-google-charts'

const DowActivityChart = () => {
  return (
    <div style={{ display: 'flex', maxWidth: 900, justifyContent: 'center' }}>
      <Chart
        className='dow-chart'
        width={450}
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
          title: 'Dow Jones Industrial Average',
          hAxis: { title: 'TUE, OCTOBER 27, 2021', titleTextStyle: { color: '#333' } },
          vAxis: { minValue: 35000 },
          chartArea: { width: '50%', height: '70%' }
        }}
      />
    </div>
  )
}

export default DowActivityChart
