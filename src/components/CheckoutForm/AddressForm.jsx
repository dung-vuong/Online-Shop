import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Grid, Typography, Button } from '@mui/material'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import {commerce} from '../../lib/commerce'

import FormInput from './FormInput'

const AddressForm = ({checkoutToken, next}) => {
    const methods = useForm()

    //SHIPPING USESTATE 
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState('')
    const [subdivisions, setSubdivisions] = useState([])
    const [subdivision, setSubdivision] = useState('')
    const [options, setOptions] = useState([])
    const [option, setOption] = useState('')

    const theCountries = Object.entries(countries).map(([code, name]) => ({id: code, label: name}))
    const theSubdivisions = Object.entries(subdivisions).map(([code, name]) => ({id: code, label: name}))
    const theOptions = options.map((s0) => ({id: s0.id, label: `${s0.description} - (${s0.price.formatted_with_symbol})`}))

    const fetchCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setCountries(countries)
        setCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
        setSubdivisions(subdivisions)
        setSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})
        setOptions(options)
        setOption(options.id[0])
    }

    useEffect(() => {
        fetchCountries(checkoutToken.id)
    },[])

    useEffect(() => {
        if(country) fetchSubdivisions(country)
    },[country])

    useEffect(() => {
        if(subdivision) fetchOptions(checkoutToken.id, country, subdivision)
    },[subdivision])

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>   
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({...data, country, subdivision, option}))}>
                    <Grid container spacing={3}>
                        <FormInput name="firstName" label="First Name"/>
                        <FormInput name="lastName" label="Last Name"/>
                        <FormInput name="address1" label="Address"/>
                        <FormInput name="email" label="Email"/>
                        <FormInput name="city" label="City"/>
                        <FormInput name="zip" label="Zip Code"/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={country} fullWidth onChange={(e) => setCountry(e.target.value)}>
                                {theCountries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={subdivision} fullWidth onChange={(e) => setSubdivision(e.target.value)}>
                                {theSubdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                        {subdivision.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={option} fullWidth onChange={(e) => setOption(e.target.value)}>
                                {theOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br/>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                        <Button type='submit' variant='contained' color='primary'>Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm