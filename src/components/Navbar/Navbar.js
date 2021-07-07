import React,{useState,useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import decode from 'jwt-decode'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {AppBar,Avatar,Toolbar,Typography,Button} from '@material-ui/core'
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import useStyles from "./styles"
import memories from '../../images/memories.png'
const Navbar = () => {
    const classes = useStyles();
    const [user,setuser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [popup,setpopup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        const token = user?.token;
        //JWT
        
        if(token){
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) 
                logout();
        }
        setuser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const logout = ()=>{
        dispatch({type:'LOGOUT'});
        history.push('/');
        setuser(null);
    };
    const createPosthandler=()=>{

    }
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading}  variant="h2" align="center">
                twira
                </Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />             
                
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} varient="h6">{user.result.name}</Typography>
                        <Button varient="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <div>
                        <Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>
                    </div>
                )}
            </Toolbar>
            
            
        </AppBar>
        
    )
};

export default Navbar;
