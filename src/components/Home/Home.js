import React,{useState,useEffect} from 'react'
import {Container,AppBar, Typography, Grow, Grid} from '@material-ui/core';
import Posts from '../Posts/Posts'
import Form from '../Form/Form';
import useStyles from './styles';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
//to dispatch an action
import {useDispatch} from 'react-redux';
//importing action
import {getPosts,getTrendingPosts} from '../../actions/posts';

function Home() {
    const classes = useStyles();
    const[currentId, setcurrentId] = useState(null);
     {/* define dispatch*/}
    const dispatch = useDispatch();
      {/* best way to call dispatch is inside useEffect*/}
    useEffect(()=>{
        dispatch(getPosts()); //getPosts action taken
    },[currentId,dispatch]);

    
    const [postType, setpostType] = useState('newest');
    const TrendingPost = ()=>{
        dispatch(getTrendingPosts());
        setpostType('trending');
    }
    const NewPost = ()=>{
        dispatch(getPosts());
        setpostType('newest');
    }

    const[open, setopen] = useState(false);
    const handleOpen = ()=>{
        setopen(true);
    }
    const handleClose = ()=>{
        setopen(false);
    }
    const FormPop = ()=>{
        return (open == true) ? 
                    (
                        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                            <Form currentId={currentId} setcurrentId={setcurrentId} setopen={setopen}/>
                        </Dialog>
                        
                    ):(
                        <div></div>
                    );        
    }
    return (
        <div>
            {
                postType=='newest'?(
                    <div>
                        <Button color="secondary" onClick={TrendingPost}>
                            <WhatshotIcon color="secondary" onClick={TrendingPost}/>
                            Trending
                        </Button>
                      
                    </div>
                ):(
                    <div>   
                        <Button  color="primary" onClick={NewPost}>
                            <NewReleasesIcon color="primary" onClick={NewPost}/>
                            New
                        </Button>
                    </div>
                )      
            }
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={1}>
                        <Grid item xs={12}  spacing={3} >
                        <Posts setcurrentId={setcurrentId} setFormOpen={setopen}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
            <Grid item xs={12} sm={4}>  
                            <Fab className={classes.icons} color="primary" aria-label="add">
                                <AddIcon onClick={handleOpen}/>
                            </Fab>
                            <FormPop/> 
            </Grid>
            
        </div>
    )
}

export default Home
