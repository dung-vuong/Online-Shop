import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material'
import useStyles from './styles'

const CartItem = ({item, handleUpdateCart, handleRemoveCart}) => {
    const {classes} = useStyles()
    return (
        <Card>
            <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type='button' size="small" onClick={() => handleUpdateCart(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type='button' size="small" onClick={() => handleUpdateCart(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button variant="contained" type='button' color='secondary' onClick={() => handleRemoveCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem