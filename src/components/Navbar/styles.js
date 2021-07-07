import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
           
  },
  heading: {
    color: '#2E8B57',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  AddButton:{
    color: '#2E8B57',
    fontSize:'35px',
    margin:"20px",
    textShadow: '0 0 20px blue',
    "&:hover": {
     cursor:'pointer',
     textShadow: '0 0 10px blue',
    },
  createPostText:{
    color: '#2E8B57',
    textShadow: '0 0 20px blue',
    
  }
  }
}));