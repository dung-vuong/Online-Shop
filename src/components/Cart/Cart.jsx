import React from 'react'
import { Container, Typography, Button, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import CartItem from './CartItem/CartItem'
import useStyles from './styles'

const Cart = ({cart, handleUpdateCart, handleRemoveCart, handleEmptyCart}) => {
    const {classes} = useStyles()

    const EmptyCard = () => (
        <Typography variant='subtitle1'>You have no items in your shopping cart, &nbsp; 
            <Link to="/" className={classes.link}>ADD BOOKS NOW</Link>!
        </Typography>
    )

    const FilledCard = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items && cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem 
                            item={item}
                            handleUpdateCart={handleUpdateCart}
                            handleRemoveCart={handleRemoveCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h4'>
                    Subtotal: {cart.subtotal && cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button 
                        className={classes.emptyButton} 
                        size="large" 
                        type="button" 
                        variant='contained' 
                        color='secondary'
                        onClick={handleEmptyCart}
                    >
                        Empty Card
                    </Button>

                    <Button 
                        className={classes.checkoutButton} 
                        component={Link}
                        to="/checkout"
                        size="large" 
                        type="button" 
                        variant='contained' 
                        color='primary'
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    )
    
    return (
        <Container>
            <div className={classes.toolbar}/>
            <Typography variant='h3' className={classes.title} gutterBottom>Your Shopping Cart</Typography>
            {cart.line_items && cart.line_items.length === 0 ? <EmptyCard/> : <FilledCard/>}
        </Container>
    )
}

export default Cart