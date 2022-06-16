import React, { useState } from 'react'
import { Box } from '@mui/material'
import { EjectRounded } from '@mui/icons-material'

import HeroBanner from '../components/HeroBanner'
import SearchExercises from '../components/SearchExercises'
import Exercises from '../components/Exercises'

const Home = () => {
  // home에서 useState를 만든 이유는 -> Home에서의 state의 변화가 모든 컴포넌트들에게 반영되기 때문에!
  const [bodyPart, setBodyPart] = useState('all')
  const [exercises, setExercises] = useState([])

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
      <Exercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
      />
    </Box>
  )
}

export default Home
