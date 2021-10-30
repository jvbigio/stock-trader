import React from 'react'

import './LineChart.css'

import { Chart } from 'react-google-charts'

const LineChart = () => {
  const date = new Date('2021-10-22')

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Chart
        className='line-chart'
        // width='600px'
        width={900}
        // height='400px'
        height={300}
        chartType='LineChart'
        loader={<div>Loading Chart</div>}
        // data={[
        //   [
        //     { type: 'number', label: 'Value' },
        //     'Current Balance'
        //   ],
        //   [0, 0],
        //   [1, 10],
        //   [2, 23],
        //   [3, 17],
        //   [4, 18],
        //   [5, 9],
        //   [6, 11],
        //   [7, 27],
        //   [8, 33],
        //   [9, 40],
        //   [10, 32],
        //   [11, 35]
        // ]}
        // options={{
        //   hAxis: {
        //     title: 'Current Value'
        //   },
        data={[
          [
            { type: 'date', label: 'Day' },
            'Current Balance'
          ],
          [new Date('2021-10-22'), 5000],
          [new Date('2021-10-23'), 6200],
          [new Date('2021-10-24'), 5900],
          [new Date('2021-10-25'), 6000],
          [new Date('2021-10-26'), 7000]
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
