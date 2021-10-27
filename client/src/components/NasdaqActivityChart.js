import React from 'react'

import { Chart } from 'react-google-charts'

const NasdaqActivityChart = () => {
  return (
    <div style={{ display: 'flex', maxWidth: 900, justifyContent: 'center' }}>
      <Chart
        width={450}
        height='300px'
        chartType='AreaChart'
        loader={<div>Loading Chart</div>}
        data={[
          ['Time', 'Index  Avg'],
          ['10A', 15323.60],
          ['11A', 15363.80],
          ['12P', 15290.07],
          ['1P', 15216.29],
          ['2P', 15243.15],
          ['3P', 15262.55],
          ['4P', 15233.72]
        ]}
        options={{
          title: 'NASDAQ',
          hAxis: { title: 'TUE', titleTextStyle: { color: '#333' } },
          vAxis: { minValue: 15000 },
          colors: ['red', '#004411'],
          chartArea: { width: '50%', height: '70%' }
        }}
      />
    </div>
  )
}

export default NasdaqActivityChart
