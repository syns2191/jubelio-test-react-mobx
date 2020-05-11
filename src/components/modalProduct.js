import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import MUIRichTextEditor from 'mui-rte'
import { Grid } from '@material-ui/core';
import { convertFromHTML, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  form: {
      paddingTop: 40,
      paddingBottom: 40
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  let dsc = props.data.description
  const formatter = (val) => {
      try {
          let ctHtml = convertFromHTML(val)
          let ctst = ContentState.createFromBlockArray(ctHtml.contentBlocks, ctHtml.entityMap)
          return JSON.stringify(convertToRaw(ctst))
      } catch (error) {
          return val
      }
  }

  const onChange = (val, field) => {
     props.onDataChange(val, field)
  }

  const textAreaSave = (val, field) => {
      let ctst = convertFromRaw(JSON.parse(val))
      let lastVal = stateToHTML(ctst)
      props.onDataChange(lastVal, field)
  }

  return (
    <div>
      <Dialog fullScreen open={props.visible} onClose={props.modalClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={props.modalClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              
            </Typography>
            <Button autoFocus color="inherit" onClick={props.saveChange}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <form className={classes.form} noValidate autoComplete="off">
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={11} sm={10} md={10}>
                <div>
                    <TextField
                    id="outlined-textarea"
                    label="Title"
                    placeholder=""
                    multiline
                    variant="outlined"
                    fullWidth
                    value={props.data.name}
                    onChange={event => {
                        onChange(event.target.value, 'name')
                    }}
                    />
                    
                </div>
                </Grid>
                <Grid item xs={11} sm={10} md={10}>
                    <div>
                    <TextField
                    id="outlined-textarea"
                    label="Price"
                    placeholder=""
                    multiline
                    variant="outlined"
                    fullWidth
                    value={props.data.price}
                    onChange={event => {
                        onChange(event.target.value, 'price')
                    }}
                    />
                    </div>
                </Grid>
                <Grid item xs={11} sm={10} md={10}>
                    <div>
                    <MUIRichTextEditor 
                        value={formatter(dsc)}
                        label="Start typing..." 
                        onSave={event => {
                            textAreaSave(event, 'description')
                        }}
                    />
                    </div>
                </Grid>
            </Grid>
        </form>
      </Dialog>
    </div>
  );
}