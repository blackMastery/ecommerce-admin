import React from 'react'
import { TextArea,Table,Modal,Form,Checkbox,Button, Container, Tab  } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '../../apollo/client/mutations';



const formReducer = (state, event) => {
    console.log(state, event)
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

    const [_createProduct] =  useMutation(CREATE_PRODUCT,
       {
        onCompleted:(d)=>{
          console.log(d)
          setFormData(null,{
            reset: true
          })
      
        }
    });
    const [_updateProduct] =  useMutation(UPDATE_PRODUCT, {
      onCompleted:(d)=>{
        console.log(d)
  
      }
  });


 

  const [formData, setFormData] = React.useReducer(formReducer, {
    description: product.description,
    price:  product.price,
    name: product.name,
    rating: product.rating
  });

 

    let selectCategoryId;


    let categoryOptions =[];
  // categoryOptions = categoriesRes.data.Category.map((cat)=>{
  //   const {id, name, label, md_icon} =  cat;
  //   return {
  //     key:id,
  //     value:name,
  //     text:name

  //   }
  // })
  
  const handleChange = event => {
    //   handling change in text input 
    const {name, value} = event.target;
    setFormData({
      name: event.target.name,
      value: event.target.value,
        
    });
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    // alert( JSON.stringify({formData, selectCategoryId}));
    // setSubmitting(true);

  if (!product.id){  
     _createProduct({
      options:{
        onCompleted :(d) =>{
        console.log("created",d)
      }}, 
      variables: {
      name: formData.name,
      price: formData.price,
      rating: formData.rating,
      user_id: 1,
      description: formData.description,
        img_url:"img_url"
    }});

   
  }else {
    _updateProduct({variables: {
      name: formData.name,
      price: formData.price,
      rating: formData.rating,
      description: formData.description,
      img_url:"img_url",
      id: product.id
  },
  
  }
  );

  }



  }

  const catChange = (e, {value}) => {
      let mycategory  =  categoryOptions
      .find(cat=> cat.value === value);
      selectCategoryId = mycategory.key;
  }


//   console.log(formData)
    return (
        <>
         <Form onSubmit={handleSubmit}>
         <Form.Group widths='equal'>
          <Form.Field>
            <label> Name </label>
            <input placeholder='Name'  name="name" type="text" onChange={handleChange} defaultValue={product.name}/>
          </Form.Field>
          <Form.Field>
            <label>price</label>
            <input placeholder='price' type="number" name='price' onChange={handleChange} defaultValue={product.price}/>
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
            <input placeholder='rating' type="text" name='rating' onChange={handleChange} defaultValue={product.rating}/>
          </Form.Field>
          </Form.Group>

            <Form.TextArea label='Description' type="text" 
            name="description" onChange={handleChange} placeholder='Description'
            defaultValue={formData.description}
             
            />
          <Button type='submit'>Submit</Button>
        </Form>
        </>
    )

}
export default ProductForm
