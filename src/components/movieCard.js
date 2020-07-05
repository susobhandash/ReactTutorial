import React, {useState, useEffect} from "react";
import {useService} from '../services/movieService';

// React UI Libraries
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MovieIcon from '@material-ui/icons/Movie';
import Tooltip from '@material-ui/core/Tooltip';

const { useCallback } = React;

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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

export default function MovieCard({movie}){
    const service = useService();
    const [movieid, setMovieid] = useState(0);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const gethortDesc = (desc) => {
        return desc.substring(0, 100) + '....';
    };

    useEffect(() => { 
        setMovieid(movieid);
            if(movieid !== 0) {
                const data = service.getSimilarMovies(movieid).then(async (res) => {
                    const result  = await res.json();
                    console.log(result);
                });
            }
    }, [service, movieid]);

    return (
        //  <div className="card neo-shadow-lvl">
        //     <div className="card--image">
        //         <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
        //             alt={movie.title + ' poster'} data={movie.id}
        //             onClick={(e) => {setMovieid(Number(e.target.getAttribute('data')));}}
        //         />
        //     </div>
        //     <div className="card--content">
        //         <h3 className="card--title"> {movieid} {movie.id} {movie.title}</h3>
        //         <p><small>RELEASE DATE: {movie.release_date}</small></p>
        //         <p><small>RATING: {movie.vote_average}</small></p>
        //         <p className="card--desc">{movie.overview}</p>
        //     </div>

        // </div>
        <Card className={classes.root}>
            <Tooltip title={movie.title}>
                <CardHeader
                    avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <MovieIcon/>
                    </Avatar>
                    }
                    action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                    }
                    title={movie.title}
                    subheader={movie.vote_average}
                />
            </Tooltip>
            <CardMedia
                className={classes.media}
                image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                title={movie.title + ' poster'}
            />
            <CardContent>
                <Typography variant="h6" color="textPrimary" component="h6">
                    Release Date: {movie.release_date}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {gethortDesc(movie.overview)}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {movie.overview}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}