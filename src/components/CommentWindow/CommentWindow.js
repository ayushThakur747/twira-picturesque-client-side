import React, { useState } from 'react'
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function CommentWindow({post}) {
    const [open, setOpen] = useState(false);
    const [comment,setcomment] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log(comment);
    };
    return (
        <div>
            
            <Button color="primary" onClick={handleClickOpen}>
                <CommentIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{post.name}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {post.title}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Your comment here"
                    type="email"
                    fullWidth
                    onChange={(e)=>setcomment({...comment,comment:e.target.value})}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                    Comment
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CommentWindow;
