import React, {useState, useEffect} from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import  {commerce} from '../../../lib/commerce'

import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'

import useStyles from './styles'

const steps = ['Shipping Address', 'Payment details']

const Checkout = ({cart, handleCaptureCheckout, order, errorMessage}) => {
    const {classes} = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [shippingData, setShippingData] = useState({})
    const [checkoutToken, setCheckoutToken] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                setCheckoutToken(token)
            } catch (error) {
                console.log(error)
            }
        }
        
        generateToken()
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const Form = () => activeStep === 0 
        ?   <AddressForm 
                checkoutToken={checkoutToken} 
                next={next}
            />
        :   <PaymentForm 
                shippingData={shippingData} 
                checkoutToken={checkoutToken} 
                backStep={backStep}
                handleCaptureCheckout={handleCaptureCheckout}
                nextStep={nextStep}
            />
    const Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>
                    Thanks for your purchase, {order.customer.firstname} {order.customer.lastname}.
                </Typography>
                <Divider className={classes.divider}/>
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Store</Button>  
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    )

    if (errorMessage){
        <>
            <Typography variant="h5">Error: {errorMessage}</Typography>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Store</Button>  
        </>
    }

    
    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length 
                        ? <Confirmation/> 
                        : checkoutToken && <Form/>
                    }
                </Paper>
            </main>
        </>
    )
}

export default Checkout