import React from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import {chooseMake, chooseModel, chooseCondition, chooseYear  } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';

import { server_calls } from '../../api';

import { useGetData } from '../../custom-hooks';


interface CarFormProps {
    id?:string;
    data?:{}
}

interface CarState {
    make: string;
    model: string;
    condition: string;
    year: string;
}

export const CarForm = (props:CarFormProps) => {
    const dispatch = useDispatch();
    // let { carData, getData } = useGetData();
    const store = useStore();
    const make = useSelector<CarState>(state => state.make);
    const { register, handleSubmit } = useForm({ })

    const onSubmit = (data:any, event:any) => {
        console.log(props.id)
        // The ! is for strictly typed Typescript stuff
        if(props.id!){
            server_calls.update(props.id!, data);
            console.log(`Updated:${data} ${props.id}`);
            console.log(data);
            setTimeout( () => {window.location.reload()}, 1000);
            event.target.reset();
        } else {
            // Dispatch basically updates our state / Redux store
            dispatch(chooseMake(data.make));
            dispatch(chooseModel(data.model));
            dispatch(chooseCondition(data.condition));
            dispatch(chooseYear(data.year));
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="make">Car Make</label>
                    <Input {...register('make')} name="make" placeholder='make'/>
                </div>
                <div>
                    <label htmlFor="model">Model</label>
                    <Input {...register('model')} name="model" placeholder='model'/>
                </div>
                <div>
                    <label htmlFor="condition">Condition</label>
                    <Input {...register('condition')} name="condition" placeholder="car's condition"/>
                </div>
                <div>
                    <label htmlFor="Year">Year</label>
                    <Input {...register('Year')} name="Year" placeholder='Year'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}
