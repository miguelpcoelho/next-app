import { Card, CardContent, Box, Button, FormGroup } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { object, string } from 'yup'
import { useState } from 'react';

const initialValues={
    email: '',
    password: ''
}

export default function Login() {
    const [message, setMessage] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(){
        const resp = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
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
                        email: string()
                            .email("Enter a valid email")
                            .required("Enter your email"),
                        password: string()
                            .min(8, "Password must contain at least 8 characters")
                            .required("Enter your password"),
                    })}
                    onSubmit={(values, formikHelpers) => {
                        return new Promise<void>(res => {
                            setTimeout(() => {
                                setEmail(values.email);
                                setPassword(values.password);
                                handleLogin();
                                res();
                            }, 5000);
                        })
                    }}
                >
                    {({values, errors, isSubmitting}) => (
                        <Form>
                            <FormGroup style={{alignItems: 'center'}}>
                                <Field 
                                    name="email"
                                    component={TextField}
                                    label="Email"
                                    type="email"
                                />  
                                <ErrorMessage name='email'/>  

                                <Field 
                                    name="password"
                                    component={TextField}
                                    label="Password"
                                    type="password"
                                />
                                <ErrorMessage name='password'/>

                                <Button
                                    disabled={isSubmitting}
                                    style={{marginTop: 10}}
                                    type="submit"
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