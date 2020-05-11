import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import ModalProduct from './modalProduct';
import DialogDelete from './dialogDelete'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 10,
    minHeight: 10,
    maxHeight: 10,
    paddingTop: '56.25%', // 16:9
    width: 200,
    textAlign: 'center',
    margin: 'auto'
  },
  title: {
    '-webkit-line-clamp': 2,
    minHeight: 50,
    textAlign: 'center'
  },
  rating: {
      textAlign: 'center',
      margin: 'auto'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CustomCard = (props) => {
  const classes = useStyles();
  const formatTitle = (str) => {
      return str.substr(0,50);
  }

  const getDetail = (item) =>{
      props.handleEdit()
      props.onShow(item)
  }

  const showDialog = (item) => {
      props.handleDelete()
      props.onShow(item)
  }

  return (
      <div>
          <ModalProduct 
            visible={props.showModal} 
            modalClose={props.closeModal} 
            data={props.data}
            onDataChange={props.onDataChange}
            saveChange={props.saveChange}
            />
            <DialogDelete 
                showDeleteAlert={props.showDeleteAlert}
                yes={props.dialogYes}
                no={props.dialogNo}
             />
          <Grid container spacing={5}>
              {
                  props.products.map(item => {
                      return (
                          <Grid item xs={6} sm={3} key={item.id}>
                              <Card className={classes.root}>
                                  <CardMedia
                                      className={classes.media}
                                      image={item.imageUrl}
                                      title="Paella dish"
                                  />
                                  <CardContent className={classes.rating}>
                                      <Typography variant="body2" color="textSecondary" component="p" className={classes.title}>
                                          {formatTitle(item.name)}
                                      </Typography>
                                      <Typography variant="body2" color="textSecondary" component="p" className={classes.title}>
                                          Rp. {item.price}
                                      </Typography>
                                      <Rating
                                          className={classes.rating}
                                          name="customized-empty"
                                          defaultValue={2}
                                          precision={0.5}
                                          emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                      />
                                  </CardContent>
                                  <CardActions disableSpacing>
                                      <IconButton aria-label="Edit" onClick={() => getDetail(item)}>
                                          <CreateIcon />
                                      </IconButton>
                                      <IconButton aria-label="Delete" onClick={() => showDialog(item)}>
                                          <DeleteIcon />
                                      </IconButton>
                                  </CardActions>
                              </Card>
                          </Grid>
                      )
                  })
              }
          </Grid>
      </div>
  );
}

export default CustomCard;