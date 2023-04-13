import React,{useEffect, useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import  GoogleLogin  from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import { AUTH } from '../../constants/actionTypes';
import {gapi} from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import {signup, signin} from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {

  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientId = '725049227838-1h2otnc632cf92boj8qt3l5ahhqs2899.apps.googleusercontent.com';
  const [isSignup, setIsSignup] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

    useEffect(() => {
        gapi.load("client:auth2",()=>{
            gapi.auth2.init({clientId:clientId})
        })
    },[])

  const switchMode = () => {
    setFormData(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }  
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      if (isSignup) {
        dispatch(signup(formData, navigate));
        //navigate('/');
      } else {
        dispatch(signin(formData, navigate));
        //navigate('/');
      }
  }

  const googleSuccess = async (res) => {
        
        console.log("res = ",res);

        const result = res?.profileObj;
        const token = res?.tokenId;
    
        try {
          dispatch({ type: AUTH, data: { result, token } });
    
          navigate('/');
        } catch (error) {
          console.log(error);
        }  
  };

  const googleError = (error) => {
    console.log(error);
  }

  return (
    <Container component="main" maxWidth="xs">
       
       <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>


        <form className={classes.form} onSubmit={handleSubmit}>

        <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange}  half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
            
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>

          <GoogleLogin 
            
            clientId={clientId}
            startIcon={<Icon/>}
            buttonText="Login"
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy={"single_host_origin"}

          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
               
        </form>

      </Paper>

    </Container>
  )
}

export default Auth;