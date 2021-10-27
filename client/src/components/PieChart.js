import React from 'react'

import { Chart } from 'react-google-charts'

const PieChart = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Chart
        // width='500px'
        width={450}
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
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  )
}

export default PieChart
