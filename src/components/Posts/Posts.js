import React from 'react'
import Post from './Post/Post';
import useStyles from './styles';
import {Grid, CircularProgress} from '@material-ui/core';
//to retrieve the data from that global redux store we use selector
import {useSelector} from 'react-redux';

function Posts({setcurrentId , setFormOpen}) {

    const posts = useSelector(state => state.posts); //state.posts because we have combine all the reducers with name posts
    //console.log();
    const classes = useStyles();
    return (
        !posts.length ? <CircularProgress/>:(
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {
                        posts.map((post)=>(
                            <Grid key={post.id} item xs={12} sm={6}>
                                <Post post={post} setcurrentId={setcurrentId} setFormOpen={setFormOpen} />
                            </Grid>
                        ))
                    }
            </Grid>
        )
    )
}

export default Posts
