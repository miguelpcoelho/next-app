import React, { useState } from 'react';
import { Button, Card, CardContent, FormGroup } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { object, string, ref } from 'yup'

const initialValues={
    email: '',
    password: '',
    name: '',
    //confirmPassword: ''
} 

export default function Signup() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    //const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState<any>(null);
    
    async function handleSignUp() {
        const resp = await fetch('http://localhost:3000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password,
            name,
            //confirmPassword
          })
        });
        const json = await resp.json();
        setMessage(json);
    }

    return ( 
        <Card>
            {JSON.stringify(message)}
            <CardContent>
                <Formik 
                    initialValues={initialValues}
                    validationSchema={object({
                        name: string()
                        .required("Enter your name"),
                        email: string()
                        .email("Enter a valid email")
                        .required("Enter your email"),
                        password: string()
                        .min(8, "Password must contain at least 8 characters")
                        .required("Enter your password"),
                        /**confirmPassword: string()
                        .required("Confirm your password")
                        .oneOf([ref("password")], "Password does not match")*/
                    })}
                    onSubmit={(values, formikHelpers) => {
                        return new Promise<void>(res => {
                            setTimeout(() => {
                                setName(values.name);
                                setEmail(values.email);
                                setPassword(values.password);
                                handleSignUp();
                                res();
                                console.log(values)
                                //setConfirmPassword(values.confirmPassword);
                            }, 5000);
                        })
                    }}
                >
                    {({values, errors, isSubmitting}) => (
                        <Form>
                            <FormGroup style={{alignItems: 'center'}}>
                                <Field
                                    name="name"
                                    component={TextField}
                                    label="Name"
                                />
                                <ErrorMessage name='name'/>

                                <Field 
                                    name="email"
                                    type="email"
                                    component={TextField}
                                    label="Email"
                                />
                                <ErrorMessage name='email'/>                                

                                <Field 
                                    name="password"
                                    component={TextField}
                                    label="Password"
                                    type="password"
                                />
                                <ErrorMessage name='password'/>
                                
                                {/**
                                <Field
                                    name="confirmPassword"
                                    component={TextField}
                                    label="Confirm Password"
                                    type="password"
                                />
                                <ErrorMessage name='confirmPassword'/>
                                */}

                                <Button
                                    style={{marginTop: 10}}
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    Confirm
                                </Button>
                            </FormGroup>
                        </Form>
                    )}
                </Formik>
            </CardContent>
        </Card>
    )
}

/**
export function FormikStepper({children, ...props}: FormikConfig<FormikValues>) {
    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    return (
        <Formik {...props} onSubmit={async(value,) => {

        }}>
            <Form autoComplete="off">
                {currentChild}

                {step > 0 &&
                    <Button onClick={() => setStep(step=> step-1)}>Back</Button>
                }
                <Button type="submit" onClick={() => setStep(step=> step-1)}>Next</Button>
            </Form>
        </Formik>
    )
}
*/