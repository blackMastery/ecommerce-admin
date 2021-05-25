import {useState} from 'react';

export default initialVal => {
    const [value, setValue] =  useState(initialVal)


    const handleChange = e => {
        const {name} = e.target;
        setValue({
            ...value,
            [name]: e.target.value

        })
    }

    const reset = () => {
        setValue(initialVal)
    }

    return [value, handleChange, reset];
}