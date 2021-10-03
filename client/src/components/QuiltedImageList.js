import * as React from 'react'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

// 12 images for imageList example
import analysis from '../images/analysis.jpg'
import bull from '../images/bull.jpg'
import business from '../images/business.jpg'
import data from '../images/data.jpg'
import lightBulb from '../images/light-bulb.jpg'
import suit from '../images/suit.jpg'
import mobileStocks from '../images/mobile-stocks.jpg'
import people from '../images/people.jpg'
import report from '../images/report.jpg'
import mobileTransaction from '../images/phone-transaction.jpg'
import hand from '../images/hand.jpg'
import work from '../images/work.jpg'

function srcset (image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`
  }
}

export default function QuiltedImageList () {
  return (
    <ImageList
      // sx={{ width: 500, height: 450 }}
      sx={{ width: '100%', height: 800 }}
      variant='quilted'
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading='lazy'
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

const itemData = [
  {
    img: `${analysis}`,
    title: 'Analysis',
    rows: 2,
    cols: 2
  },
  {
    img: `${lightBulb}`,
    title: 'Bull'
  },
  {
    img: `${mobileTransaction}`,
    title: 'Camera'
  },
  {
    img: `${report}`,
    title: 'Coffee',
    cols: 2
  },
  {
    img: `${hand}`,
    title: 'Hats',
    cols: 2
  },
  {
    img: `${mobileStocks}`,
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2
  },
  {
    img: `${data}`,
    title: 'Basketball'
  },
  {
    img: `${bull}`,
    title: 'Fern'
  },
  {
    img: `${suit}`,
    title: 'Mushrooms',
    rows: 2,
    cols: 2
  },
  {
    img: `${work}`,
    title: 'Tomato basil'
  },
  {
    img: `${business}`,
    title: 'Sea star'
  },
  {
    img: `${people}`,
    title: 'Bike',
    cols: 2
  }
]
