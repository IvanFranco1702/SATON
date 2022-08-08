import { useState,useMemo,useEffect } from 'react';

export const useForm = ( initialForm = {},  formValidation= {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ StateMessageError,setStateMessageError ] = useState('');
    const [validacion, setValidacion] = useState({})
    useEffect(() => {
        createValidators();
    }, [ formState ])

    const createValidators = () => {
        
        const formCheckedValues = {};
        
        for (const formField of Object.keys( formValidation )) {

            
            const [ fn, errorMessage ] = formValidation[formField];

            formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage;
            
        }

        setValidacion( formCheckedValues );
    }

    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( validacion )) {
            if ( validacion[formValue] !== null ) return false;
        }

        return true;
    }, [ formValidation ])

    

    const handleChange = ( e ) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }   

    const handleClear = ( e ) => {
        e.preventDefault();
        setFormState( initialForm );
        setStateMessageError('');
    }

    const handleSubmit = ( e ) => {
        e.preventDefault();
       if(validateForm()){ 
            setStateMessageError('');
            SubmitForm(formState);
            return true;
       }

        return false;

    }

    const SubmitForm = (formState) => {
        console.log(formState);
    }
    
    const validateForm = () => {

        const isValid = Object.keys( formState ).every( key => 
            validateInput( formState[ key ] , key )
        );

        return isValid;
    }


    const validateInput = ( value , key ) => {
        
        if (key === "username") {
            return validateName( value );
        }
        if (key === "email") {
        
            return validateEmail( value );
        }
        if (key === "password") {
          
            return validatePassword( value );
        }
     
        return true;
    }

    const validatePassword = ( value ) => {

        const isValid = value.length >= 6;
        if (!isValid) {
            setStateMessageError('La contraseña debe tener al menos 6 caracteres');
        }
        return isValid;

    }

    const validateConfirmPassword = ( value ) => {
        return value === formState.password;
    }

    const validateEmail = ( value ) => {

        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value );
        if ( !isValid ) {
            setStateMessageError('El correo no es válido');
        }

        return isValid;

    }

    const validateName = ( value ) => {
        const isValid = value.length > 0;
        if ( !isValid ) {
            setStateMessageError('Por favor ingrese un nombre valido');
        }

        return isValid;
    }
    

    return {
        isFormValid,
        ...validacion,
        ...formState,
        formState,
        handleChange,
        handleSubmit,
        handleClear,
        // StateMessageError
    }
}