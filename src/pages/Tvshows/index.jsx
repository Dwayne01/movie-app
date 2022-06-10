import * as React from 'react';
import { StyleSheet, useWindowDimensions, Image, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import MovieItem from '../../components/MovieItem';

const Tvshows = () => {
    const [movies, setMovies] = React.useState([]);

  React.useEffect(() => {
    getMovie();
   }, []);

  const getMovie = async () => {
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=841d7b4def08ddc32e8ee6cb00505794&language=en-US&page=1')
      .then(response => response.json())
    
    setMovies(res.results);
  }
   
  return (
    <ScrollView style={{ flex: 1 }}>

      {movies.map((movie, index) => (
        <MovieItem movie={movie} key={index} />
      ))}
    </ScrollView>
  );
}

export default Tvshows;
