import React from 'react'
import { TextArea,Table,Modal,Form,Checkbox,Button, Container, Tab,Segment  } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../../apollo/client/mutations';
import Link from 'next/link'

import { useRouter } from 'next/router'


const formReducer = (state, event) => {
    if(event.reset){
      return {
        description: " ",
    price:  "",
    name: "",
    rating: ""
      }
    }
    return {
      ...state,
      [event.name]: event.value
    }
   }



function ProductForm ({product, categoriesRes,setSubmitting}) {
  const _router =  useRouter();

  const [_deleteProduct] = useMutation(DELETE_PRODUCT,{
    onCompleted:(d)=>{
      console.log(d);
      _router.push({
       pathname:'/',
      });
    }
})
    const [_updateProduct] =  useMutation(UPDATE_PRODUCT, {
      onCompleted:(d)=>{
        console.log(d);
        _router.push({
         pathname:'/',
        query:{tab:0}});
      }
  });

  const [formData, setFormData] = React.useReducer(formReducer, product ? {
    description: product.description,
    price:  product.price,
    name: product.name,
    rating: product.rating
  } : {   description: " ",
    price:  "",
    name: "",
    rating: ""});

 

    let selectCategoryId;


    let categoryOptions =[];
  const handleChange = event => {
    //   handling change in text input 
    setFormData({
      name: event.target.name,
      value: event.target.value,
        
    });
  }



  const handleSubmit = (e) => {
  e.preventDefault();
   _updateProduct({variables: {
        name: formData.name,
        price: formData.price,
        rating: formData.rating,
        description: formData.description,
        img_url:"img_url",
        id: product.id
         },
    });

  }
 

  const catChange = (e, {value}) => {
      let mycategory  =  categoryOptions
      .find(cat=> cat.value === value);
      selectCategoryId = mycategory.key;
  }

    return (
        <Container>
         <Form onSubmit={handleSubmit}>
         <Segment stacked>

         <Form.Group widths='equal'>
          <Form.Field>
            <label> Name </label>
            <input placeholder='Name' value={formData.name || ''}  name="name" type="text" onChange={handleChange} />
          </Form.Field>
          <Form.Field>
            <label>price</label>
            <input placeholder='price' value={formData.price || ''} type="number" name='price' onChange={handleChange}/>
          </Form.Field>

          </Form.Group>
          <Form.Group widths='equal'>
            <Dropdown
                placeholder='Select Category'
                fluid
                onChange={catChange}
                search
                selection
                options={categoryOptions}
            />

            <Form.Field>
            <label>Rating</label>
            <input placeholder='rating' type="text" name='rating' value={formData.rating || ''} onChange={handleChange}/>
          </Form.Field>
          </Form.Group>

            <Form.TextArea label='Description' type="text" 
            value={formData.description || ''}
            name="description"
             onChange={handleChange} 
             placeholder='Description'
          
             
            />
          <Form.Group widths='equal'>

          <Form.Field>
          <Button  fluid size='large'
          onClick={()=>{
            _deleteProduct({variables:{id:product.id}})
          }}
          >Delete </Button>
          </Form.Field>
          <Form.Field>
          <Button  type='submit' color='teal' fluid size='large' >SAVE</Button>
          </Form.Field>


          </Form.Group>
      </Segment>
        </Form>
        </Container>
    )

}
export default ProductForm
