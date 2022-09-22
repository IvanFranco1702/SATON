// import { useEffect } from 'react';
// import { useForm } from './hooks/useForm';
import React, { useState } from 'react';
// import { useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';

import { AuthLayout } from './AuthLayout';
import { useForm } from './hooks/useForm';
let headers = new Headers()

headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
// headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
headers.append('Origin','http://localhost:3000');


// import { useForm } from '../../hooks';
// import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
const formData = {
    email: '',
    password: '',
    username: ''
  }
const formValidations = {
    email: [ (value) => value.length>4, 'El correo debe de tener una @'],
    password: [ (value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
    username: [ (value) => value.length >= 3, 'El nombre es obligatorio.'],
  }
  

  
  const url = `https://128.128.10.221/SATXWS/SatAuth/SatAuth.svc/MetodosAutenticacionHabilitados`
  const urlIAuthUs= `https://128.128.10.221/SATXWS/SatAuth/SatAuth.svc/InicioAutenticacionUsuario` 
  urlIAuthUs
  fetch(url,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:{
      
        IdentificadorOrigen: 
          {
              __type: "IdentificadorOrigenDispositivo_AppExt:http://ar.com.satxws/"
          },
        NroFactorAutenticacion: 1
      
    }   
    

  })
  .then((res)=>res.json())
  .then((data)=>data)
  

    //   fetch(urlIAuthUs, {
    //   method:'POST', 
    //   headers:{
    //     'Content-Type': 'application/json',
    //   }, 
    //   body:{
    //     NroFactorAutenticacion: 1,
    //     CodigoMetodoAutenticacion: 2,
    //     Usuario: "nova\\administrador",
    //     IdentificadorOrigen: 
    //       {
    //         __type: "IdentificadorOrigenDispositivo_AppExt:http://ar.com.satxws/"
    //       },
    //     TipoTokenSesionRequerido: 1
    //   }
    // })
    // .then((res)=>res.json())
    // .then((data)=>{
    //   debugger
    // }
    // )

export const FormWithCustomHook = () => { 
  const [formSubmitted, setFormSubmitted] = useState(false);

    
    
    const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true)
    console.log(formState)
  }

  
  
   


    const{email,password,username,handleChange,isFormValid,formState,emailValid,passwordValid,usernameValid}=useForm(formData,formValidations)

    return(
   
    <AuthLayout title="Login">
      <form 
      onSubmit={ onSubmit } 
        className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Email" 
                type="email" 
                placeholder='correo@google.com' 
                fullWidth
                name="email"
                value={ email }
                onChange={ handleChange }
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
              />
            </Grid>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Username" 
                type="text" 
                placeholder='' 
                fullWidth
                name="username"
                value={ username }
                onChange={ handleChange }
                error={ !!usernameValid && formSubmitted }
                helperText={ usernameValid }
              />
            </Grid>

            
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                name="password"
                value={ password }
                onChange={ handleChange }
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
              />
            </Grid>

            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 6 }>
                <Button
                //   disabled={ isAuthenticating }
                  type="submit" 
                  variant='contained' 
                  fullWidth
                  align-items="center"
                  >
                  Login
                </Button>
              </Grid>
              
            </Grid>


            

          </Grid>


        </form>

    </AuthLayout>
  )
}


// import { useEffect } from 'react';
// import { useForm } from './hooks/useForm';
// import React from 'react';

// export const FormWithCustomHook = () => {

//     const 
//         {
//         formState,
//         handleChange,
//         handleSubmit,
//         handleClear,
//         StateMessageError,
//         username,
//         email,
//         password
//         } = useForm({
//         username: '',
//         email: '',
//         password: ''
//     });

//     return (
//         <>
//         <div className="App-header">
//             <form onSubmit={handleSubmit} className = 'FormContainer centerDiv' >
                
//                 <label>Username:</label>
//                 <input type="text" name="username" value={username} onChange={handleChange} />
//                 <label>Email:</label>
//                 <input type="text" name="email" value={email} onChange={handleChange} />
//                 <label>Password:</label>
//                 <input type="text" name="password" value={password} onChange={handleChange} />
//                 <h1 className='MessageError' >{StateMessageError}</h1> 

//                 <input className= 'FormButton' type="submit" value="Enviar" />
//                 <input  className= 'FormButton' type="button" value="Limpiar" onClick={handleClear} />
//             </form>
//         </div>
//         </>
//     );
// }
