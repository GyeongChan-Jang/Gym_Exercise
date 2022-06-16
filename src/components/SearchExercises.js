import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'

import { exerciseOptions, fetchData } from '../utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar'

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('')

  const [bodyParts, setBodyParts] = useState([])

  // 페이지가 load 되면 카테코리를 보여줄 수 있도록 useEffect 사용
  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
      )
      setBodyParts(['all', ...bodyPartsData])
    }
    // fetchExercisesData()
  }, [])

  const handleSearch = async () => {
    if (search) {
      const exercisesData = fetchData(
        'https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions
      )
      const searchedEcercises = exercisesData.filter((exercise) => {
        exercise.name.includes(search) ||
          exercise.bodyPart.includes(search) ||
          exercise.equipment.includes(search) ||
          exercise.target.includes(search)
      })
      setSearch('')
      setExercises(searchedEcercises)
    }
  }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: '44px', xs: '30px' }
        }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br />
        Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
            width: { lg: '1170px', xs: '350px' },
            backgroundColor: '#fff',
            borderRadius: '40px'
          }}
          height="76px"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: '#FF2625',
            color: '#fff',
            textTransform: 'none',
            width: {
              lg: '175px',
              xs: '80px'
            },
            fontSize: {
              lg: '20px',
              xs: '14px'
            },
            height: '56px',
            position: 'absolute',
            right: '0'
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: 'relative', width: '100%', p: '20px' }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
        />
      </Box>
    </Stack>
  )
}

export default SearchExercises
