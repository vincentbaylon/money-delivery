import React from 'react'
import { makeStyles } from '@mui/styles'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import { Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import LocalParkingIcon from '@mui/icons-material/LocalParking'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: '5px',
    minWidth: 120,
  },
  title: {
    margin: '5px',
    color: '#FCC201',
    textShadow: '2px 2px 2px black',
  },
}))

export default function DialogSelect({ handleEnd }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [text, setText] = React.useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button color='secondary' onClick={handleClickOpen} size='large'>
        End Week
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleEnd} color='secondary'>
            End
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
