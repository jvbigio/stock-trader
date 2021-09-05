import React from 'react'
import './Home.css'

import { Image } from 'react-bootstrap/'

import chart from '../images/data-chart.jpg'

const Home = () => {
  return (
    <div className='flex-wrapper'>
      <header className='intro'>
        Simple. Intuitive. Fast.
        <br />
        Test drive StoX's fantasy trading experience
      </header>
      <main className='content-wrapper'>
        {/* background image and login? */}
        {/* <Image className='bg-image' src={chart} fluid /> */}
      </main>
    </div>
  )
}

// orig
// const Home = () => {
//   return (
//     <div className='flex-wrapper'>
//       <span className='intro'>
//         Simple. Intuitive. Fast.
//         <br />
//         Test drive StoX's fantasy trading experience
//       </span>
//       {/* <Image className='bg-image' src={chart} fluid /> */}
//     </div>
//   )
// }

export default Home
