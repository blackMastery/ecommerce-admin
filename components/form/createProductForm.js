import React from 'react'
import { TextArea,Table,Modal,Form,Checkbox,Button, Container, Tab,Segment  } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '../../apollo/client/mutations';
import Link from 'next/link'

import { useRouter } from 'next/router'
import userInputHook from '../../hooks/userInputHook'



function CreateProductForm ({product, categoriesRes,setSubmitting}) {
  const _router =  useRouter();
  const [value, handleChange, reset] = userInputHook({  description: " ",price:  "",
  name: "",
  rating: ""});
  
  const [_createProduct] =  useMutation(CREATE_PRODUCT,
       {
        onCompleted:({insert_Product})=>{
          const [product] = insert_Product.returning

          console.log(product)
      
          _router.push({
            pathname:'/',
          query:{tab:0}});
        }
    });





  const handleSubmit = (e) => {
    e.preventDefault();
  //  alert(JSON.stringify(value));
   _createProduct({
    variables: {
    name: value.name,
    price: value.price,
    rating: value.rating,
    user_id: 1,
    description: value.description,
      img_url:"img_url"
  }});

  }
 
const { description, price, rating, name } = value;
    return (
        <Container>
         <Form onSubmit={handleSubmit}>
         <Segment stacked>

         <Form.Group widths='equal'>
          <Form.Field>
            <label> Name </label>
            <input placeholder='Name' name="name" type="text" value={name} onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>price</label>
            <input placeholder='price' name="price" type="text" value={price} onChange={handleChange} />
          </Form.Field>

          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
            <label>Rating</label>
            <input placeholder='rating' type="text" name='rating' 
             value={rating} onChange={handleChange} />
          </Form.Field>
          </Form.Group>

            <Form.TextArea label='Description' type="text" 
            name="description"
             placeholder='Description'
             value={description} onChange={handleChange}

            />
          <Form.Group widths='equal'>


          <Form.Field>
          <Button  type='submit' color='teal' fluid size='large' >SAVE</Button>
          </Form.Field>


          </Form.Group>
       </Segment>
        </Form>
        </Container>
    )

}
export default CreateProductForm;
