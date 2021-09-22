import { Grid } from '@mui/material'
import { TextField } from '@mui/material'
import { Box } from '@mui/material'
import { Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'

const useStyles = makeStyles({
  input: {
    padding: '20px',
    marginBottom: '10px',
  },
})

function InputComp({
  image,
  start,
  end,
  week,
  setImage,
  setStart,
  setEnd,
  setWeek,
  setPicker,
  setParleyCard,
  refetchCard,
}) {
  const classes = useStyles()

  const handleImageUrl = (e) => {
    setImage(e.target.value)
  }

  const handleStart = (e) => {
    setStart(e.target.value)
  }

  const handleEnd = (e) => {
    setEnd(e.target.value)
  }

  const handleWeek = (e) => {
    setWeek(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const card = {
      image_url: image,
      start: start,
      end: end,
      week: week,
    }

    fetch('/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(card),
    })
      .then((res) => res.json())
      .then((data) => {
        setParleyCard(data)
        setPicker(true)
        refetchCard()
      })
  }

  return (
    <>
      <Box className={classes.input}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={2}
            lg={2}
            xl={2}
            style={{ textAlign: 'center' }}
          >
            <TextField
              fullWidth
              label='Card Image URL'
              onChange={handleImageUrl}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={2}
            lg={2}
            xl={2}
            style={{ textAlign: 'center' }}
          >
            <TextField type='number' label='Input Week' onChange={handleWeek} />
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            lg={2}
            xl={2}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-start',
            }}
          >
            <Typography variant='h6'>Input Pick Range:</Typography>
          </Grid>
          <Grid item xs={12} sm lg xl style={{ textAlign: 'center' }}>
            <TextField
              label='Start'
              type='number'
              onChange={handleStart}
            ></TextField>
            <TextField
              label='End'
              type='number'
              onChange={handleEnd}
            ></TextField>
          </Grid>
          <Grid
            item
            xs={12}
            sm={2}
            lg={2}
            xl={2}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button variant='contained' size='large' onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default InputComp
