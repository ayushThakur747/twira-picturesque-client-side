import React, { useState } from 'react'
import useStyles from './styles';
import {Card,CardActions,CardContent,CardMedia,Button,Typography} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts';
import CommentWindow from '../../CommentWindow/CommentWindow';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

function Post({post, setcurrentId, setFormOpen}) {
    const classes = useStyles();
     const dispatch = useDispatch();
    const[commentState,setcommentState] = useState(false);

     const user = JSON.parse(localStorage.getItem('profile'));

     const Likes = () => {
         
               if (post.likeCount.length > 0) {
                    return post.likeCount.find((like) => like === (user?.result?.googleId || user?.result?._id))
                    ? (
                         <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likeCount.length > 2 ? `You and ${post.likeCount.length - 1} others` : `${post.likeCount.length} like${post.likeCount.length > 1 ? 's' : ''}` }</>
                    ) : (
                         <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likeCount.length} {post.likeCount.length === 1 ? 'Like' : 'Likes'}</>
                    );
               }
          
               return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
          
        };
     
     const addCommnet = ()=>{
         setcommentState(true);
     }

     const[open, setopen] = useState(false);
     const handleOpen = ()=>{
          setopen(true);
     }
     const handleClose = ()=>{
          setopen(false);
     }
     const PicturePop = ()=>{
          return (open == true) ? 
                      (
                          <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                              <img src={post.selectedFile}/>
                              <Typography varient="h6" background>{post.title}</Typography>
                          </Dialog>
                          
                      ):(
                          null
                      );        
      }
      const onEditclick = ()=>{
          setFormOpen(true);
          setcurrentId(post._id);
          
      }
    return (
       <Card className={classes.card} >
            <div onClick={handleOpen}>
               <CardMedia className={classes.media} image={post.selectedFile} title={post.title}  />
            </div>
           <div className={classes.overlay}>    
                <Typography varient="h6">{post.name}</Typography>
                <Typography varient="h6">{moment(post.createdAt).fromNow()}</Typography>
           </div>
           <div className={classes.overlay}>
                <Button style={{color: 'white'}} size="small" onClick={()=>{}}></Button>
           </div>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
               <div className={classes.overlay2}>
                    <Button onClick={onEditclick} style={{ color: 'white' }} size="small">
                         <MoreHorizIcon fontSize="default" />
                    </Button>
               </div>
          )}
           <div className={classes.details}>
                <Typography varient="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
           </div>
           <Typography className={classes.title} variant="h5" gutterBottom > {post.title}</Typography>
           <CardContent>
                <Typography varient="body2" color="textSecondary" component="p" > {post.message}</Typography>
           </CardContent>
           <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={()=>dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
               <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" /> Delete
               </Button>
          )}
           </CardActions>
           <CommentWindow post={post} />
           <PicturePop/>
       </Card>
       
    )
}

export default Post
