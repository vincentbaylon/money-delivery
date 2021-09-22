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

export default function DialogSelect({ pick, refetchPicks, players }) {
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

  const handleDelete = () => {
    fetch(`/picks/${pick.id}`, {
      method: 'DELETE',
    }).then()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(`/picks/${pick.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        refetchPicks()
      })
  }

  const handleWin = (e) => {
    e.preventDefault()

    let updateWins = pick.user.wins + 1
    fetch(`/users/${pick.user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wins: updateWins,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetch(`/picks/${pick.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            outcome: 'Win',
          }),
        })
          .then((res) => res.json())
          .then(() => {
            refetchPicks()
            handleClose()
          })
      })
  }

  const handleLoss = (e) => {
    e.preventDefault()

    let updateLoss = pick.user.losses + 1
    fetch(`/users/${pick.user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        losses: updateLoss,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetch(`/picks/${pick.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            outcome: 'Loss',
          }),
        })
          .then((res) => res.json())
          .then(() => {
            refetchPicks()
            handleClose()
          })
      })
  }
  const handlePush = (e) => {
    e.preventDefault()

    let updatePush = pick.user.pushes + 1
    fetch(`/users/${pick.user_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pushes: updatePush,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        fetch(`/picks/${pick.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            outcome: 'Push',
          }),
        })
          .then((res) => res.json())
          .then(() => {
            refetchPicks()
            handleClose()
          })
      })
  }

  return (
    <div>
      <Button color='secondary' onClick={handleClickOpen} size='small'>
        <CreateIcon fontSize='small' />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit #{pick.number}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField
                value={text}
                onChange={handleChange}
                name='text'
                id='outlined-basic'
                variant='outlined'
                label='Pick info'
              />
            </FormControl>
            <Button type='submit' onClick={handleClose} color='primary'>
              Save
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: 'green' }} onClick={handleWin}>
            <CheckIcon />
          </Button>
          <Button style={{ color: 'red' }} onClick={handleLoss}>
            <CloseIcon />
          </Button>
          <Button onClick={handlePush}>
            <LocalParkingIcon />
          </Button>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
