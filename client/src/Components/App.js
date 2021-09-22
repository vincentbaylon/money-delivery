import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { makeStyles } from '@mui/styles'

import ToolbarComp from './ToolbarComp'
import InputComp from './InputComp'
import PickerComp from './PickerComp'
import ResultsComp from './ResultsComp'
import Footer from './Footer'

const useStyles = makeStyles({
  root: {
    // backgroundColor: 'lightgrey',
    height: '100%',
  },
})

function App() {
  const [image, setImage] = useState('')
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [week, setWeek] = useState(0)
  const [name, setName] = useState('')
  const [picker, setPicker] = useState(false)
  const [picksComplete, setPicksComplete] = useState(false)
  const [players, setPlayers] = useState([])
  const [parleyCard, setParleyCard] = useState([])
  const [picks, setPicks] = useState([])
  const classes = useStyles()

  useEffect(() => {
    fetch('/users')
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data)
      })
  }, [])

  useEffect(() => {
    fetch('/cards')
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          setParleyCard(data[0])
          setPicker(true)
        }
      })
  }, [])

  useEffect(() => {
    fetch('/picks')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPicks(data)
          if (data.length === 10) {
            setPicksComplete(true)
          }
        }
      })
  }, [])

  function refetchUsers() {
    fetch('/users')
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data)
      })
  }

  function refetchCard() {
    fetch('/cards')
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          setParleyCard(data[0])
          setPicker(true)
        }
      })
  }

  function refetchPicks() {
    fetch('/picks')
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setPicks(data)
          if (data.length === 10) {
            setPicksComplete(true)
          }
        }
      })
  }

  return (
    <>
      <CssBaseline />
      <Box className={classes.root}>
        <ToolbarComp players={players} />
        {picker ? (
          <ResultsComp
            players={players}
            picks={picks}
            parleyCard={parleyCard}
            refetchPicks={refetchPicks}
          />
        ) : null}

        {picker ? null : (
          <InputComp
            setImage={setImage}
            setStart={setStart}
            setEnd={setEnd}
            setWeek={setWeek}
            setPicker={setPicker}
            image={image}
            start={start}
            end={end}
            week={week}
            setParleyCard={setParleyCard}
            refetchCard={refetchCard}
          />
        )}
        {picker ? (
          picksComplete ? null : (
            <PickerComp
              name={name}
              setName={setName}
              parleyCard={parleyCard}
              picks={picks}
              setPicks={setPicks}
              players={players}
              refetchPicks={refetchPicks}
              refetchUsers={refetchUsers}
            />
          )
        ) : null}
        {picksComplete ? (
          <Footer
            refetchCard={refetchCard}
            refetchPicks={refetchPicks}
            setPicker={setPicker}
            setPicksComplete={setPicksComplete}
          />
        ) : null}
      </Box>
    </>
  )
}

export default App
