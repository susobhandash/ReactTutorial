import React, {useState, useEffect} from "react";
import {useService} from '../services/movieService';

// React UI Libraries
import { makeStyles } from '@material-ui/core/styles';

// Card
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';

// Typography
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

// Tooltip
import Tooltip from '@material-ui/core/Tooltip';

// Rating
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

// Icons
import TouchAppIcon from '@material-ui/icons/TouchApp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MovieIcon from '@material-ui/icons/Movie';
// import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        <Card className={classes.root}>
            
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
                title={
                    <Tooltip title={movie.title} placement="top">
                        <Typography variant="body2" color="textPrimary" component="p">
                            {movie.title}
                        </Typography>
                    </Tooltip>
                }
                subheader={
                    <Tooltip title={movie.vote_average} placement="top">
                        <Box component="fieldset" mb={0} pt={0} pb={0} pl={0} pr={0} borderColor="transparent">
                            <Rating name="customized-10" defaultValue={movie.vote_average/2} max={5} />
                        </Box>
                    </Tooltip>
                }
            />
            <CardMedia
                className={classes.media}
                image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                title={movie.title + ' poster'}
            />
            <CardContent>
                <Typography variant="small" color="textPrimary" component="small">
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
                    <TouchAppIcon />
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