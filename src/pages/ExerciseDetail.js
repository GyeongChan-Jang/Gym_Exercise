import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Detail from '../components/Detail'
import SimilarExercises from '../components/SimilarExercises'
import ExerciseVideos from '../components/ExerciseVideos'

import { Box } from '@mui/material'

import { youtubeOptions, exerciseOptions, fetchData } from '../utils/fetchData'

const ExerciseDetail = () => {
  const { id } = useParams()

  const [exerciseDetail, setExerciseDetail] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([])
  const [equipmentExercises, setEquipmentExercises] = useState([])

  useEffect(() => {
    const EXERCISES_DETAIL_URL = `https://exercisedb.p.rapidapi.com`
    const YOUTUBE_SEARCH_URL = 'https://youtube-search-and-download.p.rapidapi.com'

    const fetchExercisesData = async () => {
      const exercisesData = await fetchData(`${EXERCISES_DETAIL_URL}/exercises/exercise/${id}`, exerciseOptions)
      setExerciseDetail(exercisesData)

      const exerciseVideosData = await fetchData(`${YOUTUBE_SEARCH_URL}/search?query=${exerciseDetail.name}`, youtubeOptions)
      setExerciseVideos(exerciseVideosData.contents)

      const targetMuscleExercisesData = await fetch(`${EXERCISES_DETAIL_URL}/exercises/target/${exercisesData.target}`, exerciseOptions)
      setTargetMuscleExercises(targetMuscleExercisesData)

      const equipmentExerciseData = await fetch(`${EXERCISES_DETAIL_URL}/exercises/equipment/${exercisesData.equipment}`, exerciseOptions)
      setEquipmentExercises(equipmentExerciseData)
    }

    fetchExercisesData()
  }, [exerciseDetail.name, id])

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  )
}

export default ExerciseDetail
