import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { signIn, useSession } from "next-auth/react";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import CustomCheckbox from '../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { TextField } from 'formik-mui';
import axios from 'axios';
import Config from '../../../config/Config'

const { API_URL } = Config

const AuthLogin = ({ title, subtitle, subtext }) => {
  const {session, status} = useSession()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const initialValues = {
    userName, 
    password
  }

  // const signInWithToken = async (token) => {
  //   await signIn("credentials", {
  //     token: token,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault()
    const requestOptions = {
      method : 'POST',
      headers: {'Content-Type': 'application/json'},
      url : `${API_URL}/auth/login`,
      data: {
        email : userName,
        password : password
      }
    }
    axios(requestOptions)
    .then(async (data) => {
      console.log(data)
      await signIn(data.data.token)
      window.location.replace('/')
    })
    .catch(error => console.log('error', error))
  }

  useEffect(()=> {
    if(status === 'authenticated'){
      window.location.replace('/')
    }
  },[session, status])

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box>
      <Formik
        enableReinitialize
        validationSchema={Yup.object({
          userName : Yup.string().required('Required'),
          password : Yup.string().required('Required'),
        })}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        
      >
        <Form onSubmit={handleSubmit}>
          <Stack>
            <Box>
              <CustomFormLabel htmlFor="username">Username</CustomFormLabel>
              <Field
                component={CustomTextField}
                id="username"
                name="userName"
                variant="outlined"
                fullWidth
                value={userName}
                autoComplete="off"
                onChange={(e)=> setUserName(e.target.value)}
                />
               {/* <CustomTextField id="username" variant="outlined" fullWidth /> */}
            </Box>
            <Box>
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
              <Field
                component={CustomTextField}
                id="password"
                type="password"
                name="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
              {/* <CustomTextField id="password" type="password" variant="outlined" fullWidth /> */}
            </Box>
            <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
              <FormGroup>
                <FormControlLabel
                  control={<CustomCheckbox defaultChecked />}
                  label="Remeber this Device"
                />
              </FormGroup>
              <Typography
                component={Link}
                href="/auth/auth1/forgot-password"
                fontWeight="500"
                sx={{
                  textDecoration: 'none',
                  color: 'primary.main',
                }}
              >
                Forgot Password ?
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <Button
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              type="submit"
            >
              Sign In
            </Button>
          </Box>
        </Form>
      </Formik>
      {subtitle}
    </>
  )
};

export default AuthLogin;
