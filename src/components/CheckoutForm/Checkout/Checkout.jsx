import React, {useState} from 'react'
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@mui/material'

import PaymentForm from '../PaymentForm'
import AddressForm from '../AddressForm'
import Confirmation from '../Confirmation'
import useStyles from './styles'

const steps = ['Shipping Address', 'Payment details']

const Checkout = () => {
    const {classes} = useStyles()
    const [activeStep, setActiveStep] = useState(0)

    const Form = () => activeStep === 0 
        ? <AddressForm/>
        : <PaymentForm/>

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
                    {activeStep === steps.length ? <Confirmation/> : <Form/>}
                </Paper>
            </main>
        </>
    )
}

export default Checkout