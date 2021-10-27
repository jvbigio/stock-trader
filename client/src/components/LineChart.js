import React from 'react'

import { Chart } from 'react-google-charts'

const LineChart = () => {
  return (
    <div>
      <Chart
        // width='600px'
        width={800}
        // height='400px'
        height={300}
        chartType='LineChart'
        loader={<div>Loading Chart</div>}
        data={[
          ['x', 'Current Balance'],
          [0, 0],
          [1, 10],
          [2, 23],
          [3, 17],
          [4, 18],
          [5, 9],
          [6, 11],
          [7, 27],
          [8, 33],
          [9, 40],
          [10, 32],
          [11, 35]
        ]}
        options={{
          hAxis: {
            title: 'Date'
          },
          vAxis: {
            title: 'Your Balance History'
          }
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  )
}

export default LineChart
