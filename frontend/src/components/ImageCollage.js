import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
      sx={{ width: 365, height: 365, marginLeft:1 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: '/images/Quelted/AI3.jpeg',
    title: 'AI3',
    rows: 2,
    cols: 2,
  },
  {
    img: '/images/Quelted/AI4.jpeg',
    title: 'AI4',
  },
  {
    img: '/Images/Quelted/AI5.jpeg',
    title: 'AI5',
  },
  {
    img: '/Images/Quelted/AI6.jpeg',
    title: 'AI6',
    cols: 2,
  },
  {
    img: '/Images/Quelted/AI7.jpeg',
    title: 'AI7',
    cols: 2,
  },
  {
    img: '/Images/Quelted/AI8.jpeg',
    title: 'AI8',
  
    rows: 2,
    cols: 2,
  },
  {
    img: '/Images/Quelted/AI9.jpeg',
    title: 'AI9',
  },
  {
    img: '/Images/Quelted/AI10.jpeg',
    title: 'AI10',
  },
  {
    img: '/Images/Quelted/AI11.jpeg',
    title: 'AI11',
    rows: 2,
    cols: 2,
  },
  {
    img: '/Images/Quelted/AI12.jpeg',
    title: 'AI12',
  },
  {
    img: '/Images/Quelted/AI13.jpeg',
    title: 'AI13',
  },
  {
    img: '/Images/Quelted/AI14.jpeg',
    title: 'AI14',
    cols: 2,
  },
];
