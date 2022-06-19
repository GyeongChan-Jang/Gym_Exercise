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

  useEffect(() => {
    const EXERCISES_DETAIL_URL = `https://exercisedb.p.rapidapi.com`
    const YOUTUBE_SEARCH_RUL = 'https://youtube-search-and-download.p.rapidapi.com'

    const fetchExercisesData = async () => {
      const exercisesData = await fetchData(`${EXERCISES_DETAIL_URL}/exercises/exercise/${id}`, exerciseOptions)
      setExerciseDetail(exercisesData)

      const exerciseVideosData = await fetchData(`${YOUTUBE_SEARCH_RUL}/search?query=${exerciseDetail.name}`, youtubeOptions)
      setExerciseVideos(exerciseVideosData.contents)
    }

    fetchExercisesData()
  }, [id])

  return (
    <Box>
      <Detail exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      <SimilarExercises />
    </Box>
  )
}

export default ExerciseDetail
