import {useState} from 'react';




export default initialVal => {
    const [products, setProduct] =  useState(initialVal)

    const addProduct = (product) => {
        setProduct([...products, product ])
      }

      return [products, addProduct]



}

