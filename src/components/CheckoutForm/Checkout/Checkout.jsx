import React, {useState, useEffect} from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@mui/material'

import  {commerce} from '../../../lib/commerce'
import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'
import Confirmation from '../Confirmation'
import useStyles from './styles'

const steps = ['Shipping Address', 'Payment details']

const Checkout = ({cart, handleCaptureCheckout, order, errorMessage}) => {
    const {classes} = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [shippingData, setShippingData] = useState({})
    const [checkoutToken, setCheckoutToken] = useState(null)

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
                    {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
                </Paper>
            </main>
        </>
    )
}

export default Checkout