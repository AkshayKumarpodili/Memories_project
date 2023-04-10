import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Pagination from '../Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from '../Form/Form';
import useStyles from './styles';
import ChipInput from 'material-ui-chip-input';


//returns the search-value in useLocation Object.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

  
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState('');
  const [tags,setTags] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  

  const searchPost = () => {
    if(search || tags){
      dispatch(getPostsBySearch({search, tags: tags.join(',')}));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',') || 'none'}`);
    }
    else{
      navigate('/');
    }
  }

  

  const handleKeyPress = (e) => {
    //13 the keycode to enter button
    if(e.keyCode === 13){
      searchPost();
    }
  }

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        {/* <h1>l1 = {useLocation().search}</h1>
        <h1>q1 = {query}</h1>
        <h1>q2 = {query.get('searchQuery')},{query.get('tags')},{query.get('page') || 'none'}</h1>
        <h1>l2 = {location.search}</h1> */}
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={7} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField name="search" variant="outlined" label="Search Memories" onKeyPress={handleKeyPress} fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button> 
              {/* <Button variant="contained" className={classes.pagination} color="secondary" size="small" onClick={handleClear} fullWidth>Clear</Button> */}
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            
          
            <Paper elevation={6} className={classes.pagination} > <Pagination page={page} /> </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;