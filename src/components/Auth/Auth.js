import React,{useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container,TextField7} from '@material-ui/core'
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
import {GoogleLogin} from 'react-google-login'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'
import  useStyles from "./styles"
import Input from './Input'
import Icon from './icon'
//action
import {signin, signup} from '../../actions/auth';

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''};
function Auth() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setisSignup] = useState(false);
    const [formData,setformData] = useState(initialState);
    const history = useHistory();//from react-router-dom

    const handleShowPassword = () => setShowPassword(!showPassword);
    
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(isSignup){
            //logic for signup the uesr
            dispatch(signup(formData,history));
        }else{
            //logic for signin the uesr
            dispatch(signin(formData,history));
        }
    }
    const handleChange = (e)=>{
        setformData({...formData,[e.target.name]: e.target.value});
    }
    const switchMode = ()=>{
        setisSignup((previsSignup)=>!previsSignup);
        handleShowPassword(false)
    }
    const googleSuccess =async(res)=>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        //console.log(res);
        try {
            dispatch({type:'AUTH',data:{result,token}});//setting the redux state for the new user just loggedin 
            history.push('/');//redirecting after login
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure =()=>{
        console.log("google sign in unsuccessful,try again")
    }
     return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon/>
                </Avatar>
                <Typography varient="h5">{isSignup?'Sign Up':'Sign In'}</Typography>
                
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input className={classes.textfieldModification} name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <GoogleLogin
                        clientId="792024062383-mo3dnombq2ps8jnd0ebiq7esp6785a5n.apps.googleusercontent.com"
                        render={(renderProps) => (
                        <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                            Google Sign In
                        </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup?'already have an account signin':'new user? signup'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Container>
    )
}

export default Auth;
