import { Card, CardMedia, Typography } from '@mui/material';

export default function CardComponents({ puzzle }) {

  const { title, image_link} = puzzle

  return (
    <Card>
      <CardMedia 
        image={image_link}
      />
      <Typography>{title}</Typography>
    </Card>
  )
}