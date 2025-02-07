import { Card, Typography } from '@mui/material';
import { PuzzleType } from '../types';

interface PuzzleProps {
  puzzle: PuzzleType
}

export default function CardComponents({ puzzle }: PuzzleProps) {

  const { title, image_link, brand, price} = puzzle

  return (
    <Card sx={{ 
      width: "300px", 
      // height: "350px", 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center",
    }}>
      <img 
        style={{ width: "250px", padding: "10px", height: "250px", objectFit: "contain" }}
        src={image_link}
      />
      <Typography variant='h6' sx={{textAlign: "center"}}>{title}</Typography>
      <Typography>{brand}</Typography>
      <Typography>{price} Ft</Typography>
    </Card>
  )
}