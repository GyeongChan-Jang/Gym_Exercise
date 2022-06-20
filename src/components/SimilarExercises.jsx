import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

import HorizontalScrolbar from './HorizontalScrollbar'
import Loader from './Loader'

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  // console.log(targetMuscleExercises)
  // console.log(equipmentExercises)
  return (
    <Box sx={{ mt: { lg: '100px', xs: '0' } }}>
      <Typography variant="h3">Exercises that target the same muscle group</Typography>
      <Stack direction="row" sx={{ p: '2', position: 'relative' }}>
        {targetMuscleExercises.length ? <HorizontalScrolbar data={targetMuscleExercises} /> : <Loader />}
      </Stack>
    </Box>
  )
}

export default SimilarExercises
