import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        name
        email
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUpMutation($name: String!, $email: String!, $password: String!) {
    signUp(input: { name: $name, email: $email, password: $password }) {
      user {
        id
        name
        email
      }
    }
  }
`;



export const CREATE_PRODUCT = gql`
mutation CreateProduct(
  $name: String!, $price: String, 
  $img_url: String!, $rating: String!
  $user_id: Int!
  $description: String!
) {
  insert_Product(objects:{
    name: $name,
    price: $price,
    img_url: $img_url,
    rating: $rating,
    user_id: $user_id,
    description:$description
  }){
    affected_rows
    returning{
      id
    }
  }
}

`;


export const UPDATE_PRODUCT =  gql`
mutation UpdateProduct (
  $name: String!, $price: String!, 
  $rating: String!,
  $description: String!,
  $id: Int!
) {
  update_Product(_set: {
    name: $name, 
  price: $price,
  rating: $rating,
   description: $description
  }, where: {id: {_eq: $id}}) {
    affected_rows
    returning{
      name
    }
  }
}
`;