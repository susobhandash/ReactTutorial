import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
// import Avatar from '@material-ui/core/Avatar';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { blue } from '@material-ui/core/colors';
// import PersonIcon from '@material-ui/icons/Person';
// import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

export default class SimpleModal extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            open: this.props.open
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.open !== nextProps.open) {
          this.setState({ open: nextProps.open });
        }
    }

    render(){
        return(
            <Dialog
                modal={[]}
                open={this.state.open}
            >
                <DialogTitle id="simple-dialog-title">
                    <Typography variant="h5" color="textSecondary" component="p">
                        <div className="align-center-justify-between">
                            Similar Movies
                            <IconButton aria-label="Close Modal" onClick={() => {this.setState({opn: false}); this.props.closeModal()}}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    </Typography>
                </DialogTitle>
                <div className="card-list">
                    {this.props.movies.map((movie) => (
                        // <ListItem button key={movie.id}>
                        //     <ListItemAvatar>
                        //         <Avatar src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} />
                        //     </ListItemAvatar>
                        //     <ListItemText primary={movie.title} />
                        // </ListItem>
                        <Card className="card--root" key={movie.id}>
                            <CardActionArea>
                                <CardMedia
                                    className="card--media"
                                    image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                                    title={movie.title + ' poster'}
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" color="textPrimary" component="h2">
                                    {movie.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {movie.overview}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            {/* <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                                <Button size="small" color="primary">
                                    Learn More
                                </Button>
                            </CardActions> */}
                        </Card>
                    ))}
                </div>
            </Dialog>
        )
    }
}

SimpleModal.propTypes = {
    open: PropTypes.bool.isRequired,
    movies: PropTypes.array.isRequired,
    closeModal: PropTypes.func.isRequired
};