import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/bookStore.png'
import useStyles from './styles'

const NavBar = ({cart}) => {
    const {classes} = useStyles()
    const location = useLocation()

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to="/" variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt='Commerce' height='55px' className={classes.image}/>
                        Programming Books Shop
                    </Typography>
                    {location.pathname === '/' 
                        ?
                            (<div className={classes.button}>
                                <IconButton component={Link} to="/cart" aria-label='Show Cart Items' color='inherit'>
                                    <Badge badgeContent={cart.total_items} color='secondary'>
                                        <ShoppingCart/>
                                    </Badge>
                                </IconButton>
                            </div>)
                        :
                            (<div className={classes.button}>
                                <IconButton component={Link} to="/" aria-label='Show Cart Items' color='inherit'>
                                    <ArrowBackIcon/>
                                </IconButton>
                            </div>)
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default NavBar