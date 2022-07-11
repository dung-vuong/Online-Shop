import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import logo from '../../assets/bookStore.png'
import useStyles from './styles'

const NavBar = () => {
    const {classes} = useStyles()
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt='Commerce' height='55px' className={classes.image}/>
                        Programming Books Shop
                    </Typography>
                    <div className='classes.grow'/>
                    <div className='classes.button'>
                        <IconButton aria-label='Show Cart Items' color='inherit'>
                            <Badge badgeContent={3} color='secondary'>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar