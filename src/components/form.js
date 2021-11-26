import React, {useState} from "react";
import {makeStyles} from "@mui/styles";
import {Button,TextField, Typography} from "@mui/material";
import {useUserValue} from "../utils/reducer";
import {styles} from "./styles";
export const UserForm = () => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [{userDetails},dispatch] = useUserValue();

    const defaultValues = {
        name : "",
        age : "",
        email : "",
        phoneNumber : ""
    }

    const [values,setValues] = useState(defaultValues);
    const [error,setError] = useState({});

    const FIELDS = [{
        name : "name",
        label : "Name",
        id : "name",
        required : true
    },
    {
        name : "age",
        label : "Age",
        id : "age",
        required : false
    },
    {
        name : "email",
        label : "Email",
        id : "email",
        required : true
    },
    {
        name : "phoneNumber",
        label : "Phone Number",
        id : "phoneNumber",
        required : true
    },
];

    const handleInputValue = (e) => {
        const {name,value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
        validateField({[name] : value})
    }

    const isValidForm = () => {
        
       let allRequiredFilled = FIELDS?.every(eachField => {
        if(eachField.required) {
            return values[eachField.name]
        }
        else return true
       }) 
        return allRequiredFilled && Object.values(error).every(eachError => eachError === "")
    }

    const isFormFilled = () => {
       return Object.values(values).some(ev => ev !== "")
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isValidForm()) {
            dispatch({
                type: "ADD_DETAILS",
                payload: values,
              });
            setValues(defaultValues);
        }
        else {
            alert("Invalid form")
        }

    }

    const handleReset = () => {
        setValues(defaultValues)
        setError(defaultValues)
    }
    const validateField = (field) => {
        let errorObj = {...error};
        if("name" in field) {
            errorObj["name"] = field.name ? "" : "This field is required"
        }
        if("age" in field) {
            let ageValue = field.age;
            if(/[0-9]{1,3}/.test(ageValue)) {
                if(ageValue > 110) errorObj["age"] = "Age must not be greater than 110"
                else if(ageValue <=0) errorObj["age"] = "Age must not be less than equal to 0"
                else errorObj["age"] = "" 
            } 
            else {
                errorObj["age"] = "Age must be a number"
            } 
        }
        if("email" in field) {
            errorObj["email"] = field.email ? "" : "This field is required."
            if (field.email) {
                errorObj["email"] = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(field.email)? "" : "Email is not valid."
            }
        }
        if("phoneNumber" in field) {
            errorObj["phoneNumber"] = field.phoneNumber ? "" : "This field is required"
            if(field.phoneNumber){
                errorObj["phoneNumber"] = /^[789]\d{9}$/.test(field.phoneNumber) ? "" : "Invalid phone number"
            }
        }

        setError({
            ...error,
            ...errorObj
        })
    }

    const BUTTONS = [
        {
            label : "SUBMIT",
            disabled : !isValidForm(),
            action : handleSubmit,
            color : "success"
        },
        {
            label : "RESET",
            disabled : !isFormFilled(),
            action : handleReset,
            color : "warning"
        }
    ];
    
    return (
        <div className = {classes.formContainer}>
            <div className = {classes.formContainerHeader}>
                <Typography>Fill User Details</Typography>
            </div>
            <div className = {classes.formContainer1}>
                {
                FIELDS.map((eachField) => {
                    const {name,label,id,required} = eachField;
                    return (
                        <>
                        <div className = {classes.formField}>
                            <TextField 
                                key={id}
                                onBlur={handleInputValue}
                                onChange={handleInputValue}
                                name={name}
                                label={label}
                                required = {required}
                                fullWidth={true}
                                value = {values[name]}
                                error = {error[name]}
                                helperText = {error[name]}

                            />
                        </div>
                        </>
                        
                    )
                })
                }
                <div className = {classes.buttonContainer} >
                {
                    BUTTONS.map(eb => {
                        const {action,color,disabled} = eb;
                        return (
                            <div className = {classes.buttonContainer1}>
                            <Button variant = "contained" color = {color} onClick = {action} disabled = {disabled}>{eb.label}</Button>
                            </div>
                        )
                    })
                }
                </div>
                </div>
        </div>
    )
}