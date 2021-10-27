import React from 'react'
import './DowActivityChart.css'

import { Chart } from 'react-google-charts'

const DowActivityChart = () => {
  return (
    <div style={{ display: 'flex', maxWidth: 900, justifyContent: 'center' }}>
      <Chart
        className='dow-chart'
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
          title: 'Dow Jones Industrial Average',
          hAxis: { title: 'TUE', titleTextStyle: { color: '#333' } },
          vAxis: { minValue: 35000 },
          // For the legend to fit, we make the chart area smaller
          // chartArea: { width: '50%', height: '70%' }
          chartArea: { width: '50%', height: '70%' }
          // lineWidth: 25
          // annotations: {
          //   boxStyle: {
          //     // Color of the box outline.
          //     stroke: '#888',
          //     // Thickness of the box outline.
          //     strokeWidth: 1,
          //     // x-radius of the corner curvature.
          //     rx: 10,
          //     // y-radius of the corner curvature.
          //     ry: 10,
          //     // Attributes for linear gradient fill.

          //     }
          //   }
          // }
        }}
      />
    </div>
  )
}

export default DowActivityChart
