import { React, useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { Grid } from '@mui/material'
import { TextField } from '@mui/material'
import { MenuItem } from '@mui/material'
import { Button } from '@mui/material'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Alert } from '@mui/material'
import { AlertTitle } from '@mui/material'
import { Stack } from '@mui/material'

import ButtonCard from './ButtonCard'

const useStyles = makeStyles({
	picker: {
		padding: '10px',
		margin: '10px',
	},
})

function PickerComp({
	name,
	setName,
	parleyCard,
	picks,
	setPicks,
	players,
	refetchPicks,
	refetchUsers,
}) {
	const classes = useStyles()
	const { start, end, image_url, id } = parleyCard
	const [pickOne, setPickOne] = useState(0)
	const [pickTwo, setPickTwo] = useState(0)
	const [isClicked, setIsClicked] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const handleClick = (e) => {
		if (pickOne === 0) {
			setPickOne(e.target.value)
		} else if (pickTwo === 0) {
			setPickTwo(e.target.value)
		} else {
			alert('Clear picks')
		}
	}

	const handleClear = () => {
		setPickOne(0)
		setPickTwo(0)
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		const pickArr = [pickOne, pickTwo]

		if (name === '' || pickOne === 0 || pickTwo === 0) {
			alert('Select your name or make your picks')
		} else {
			fetch(`/users/${name}`)
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
					let user = data

					pickArr.forEach((pick) => {
						const pickObj = {
							number: pick,
							user_id: user.id,
							card_id: parleyCard.id,
						}

						fetch('/picks', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(pickObj),
						})
							.then((res) => res.json())
							.then((data) => {
								refetchPicks()
								refetchUsers()
							})
					})

					setPickOne(0)
					setPickTwo(0)
					setName('')
				})
		}
	}

	const menuItems = players.map((p) => {
		if (p.picks.length === 2) {
			return (
				<MenuItem disabled value={p.name}>
					{p.name}
				</MenuItem>
			)
		} else {
			return <MenuItem value={p.name}>{p.name}</MenuItem>
		}
	})

	const createRange = () => {
		return Array(end - start + 1)
			.fill()
			.map((_, idx) => start + idx)
	}

	const range = createRange()
	const pickNumbers = picks.map((p) => p.number)

	const buttonCards = range.map((num) => {
		return (
			<ButtonCard
				key={num}
				num={num}
				handleClick={handleClick}
				// isClicked={pickNumbers.includes(num) ? true : ((num ))}
				isClicked={(() => {
					if (pickNumbers.includes(num)) {
						return true
					} else if (num % 2 === 0) {
						if (pickNumbers.includes(num - 1)) {
							return true
						}
					} else if (num % 2 !== 0) {
						if (pickNumbers.includes(num + 1)) {
							return true
						}
					} else {
						return false
					}
				})()}
			/>
		)
	})

	return (
		<>
			<Box className={classes.picker}>
				<Grid
					container
					direction='column'
					justifyContent='center'
					alignItems='center'
					space={2}
				>
					<Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
						<img src={image_url} style={{ width: '100%' }} />
					</Grid>
				</Grid>
				<Grid
					container
					direction='row'
					justifyContent='center'
					alignItems='center'
					style={{ height: '100%', marginTop: '10px' }}
					spacing={2}
				>
					{buttonCards}
				</Grid>
				<Grid container justifyContent='center' style={{ marginTop: '10px' }}>
					<Grid item>
						<Typography variant='h5'>
							Current Picks: {pickOne}, {pickTwo}
						</Typography>
					</Grid>
				</Grid>
				<Grid container justifyContent='center' alignItems='center'>
					<Grid
						item
						xs={12}
						sm={4}
						style={{ textAlign: 'center', marginTop: '20px' }}
					>
						<TextField
							label='Pick Your Name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							sx={{ width: 250, color: 'black' }}
							select
						>
							{menuItems}
						</TextField>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}
						style={{ textAlign: 'center', marginTop: '20px' }}
					>
						<Button variant='contained' size='large' onClick={handleSubmit}>
							Submit Picks
						</Button>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}
						style={{ textAlign: 'center', marginTop: '20px' }}
					>
						<Button
							variant='contained'
							color='secondary'
							size='large'
							onClick={handleClear}
						>
							Clear Picks
						</Button>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

export default PickerComp
