import { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'
import Form from './Form'

const useStyles = makeStyles({
  results: {
    padding: '10px',
    margin: '10px',
    width: '100%',
  },
})

function ResultsComp({ players, picks, parleyCard, refetchPicks }) {
  const classes = useStyles()

  const sortedPicks = picks.sort((a, b) => a.number - b.number)

  const handleEdit = (e) => {
    console.log(e)
  }

  const handleDelete = (e) => {}

  const displayPicks = sortedPicks.map((p) => {
    return (
      <Grid
        item
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          margin: '5px',
        }}
      >
        <Typography variant='h6' color='textPrimary'>
          {p.number}.
        </Typography>

        {(() => {
          if (p.outcome === 'Win') {
            return (
              <Typography
                variant='h5'
                style={{ color: 'green', margin: '5px' }}
              >
                {p.text}
              </Typography>
            )
          } else if (p.outcome === 'Loss') {
            return (
              <Typography variant='h5' style={{ color: 'red', margin: '5px' }}>
                {p.text}
              </Typography>
            )
          } else if (p.outcome === 'Push') {
            return (
              <Typography variant='h5' style={{ color: 'blue', margin: '5px' }}>
                {p.text}
              </Typography>
            )
          } else {
            return (
              <Typography
                variant='h5'
                style={{ color: 'black', margin: '5px' }}
              >
                {p.text}
              </Typography>
            )
          }
        })()}

        <Typography color='primary'>({p.user.name})</Typography>
        {console.log(p.outcome)}
        {p.outcome === null ? (
          <Form pick={p} refetchPicks={refetchPicks} players={players} />
        ) : null}
      </Grid>
    )
  })

  return (
    <>
      {console.log(picks)}
      <Box className={classes.results}>
        <Typography variant='h5'>Week {parleyCard?.week}</Typography>
        <Grid
          container
          direction='column'
          spacing={2}
          style={{ width: '100%' }}
        >
          {displayPicks}
        </Grid>
        <br></br>
        <Typography>Current Picks:</Typography>
        {sortedPicks.map((p) => p.number + `, `)}
      </Box>
    </>
  )
}

export default ResultsComp
