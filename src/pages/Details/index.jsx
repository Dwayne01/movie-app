import * as React from 'react';
import {Image, Text, View, ScrollView } from 'react-native';

const  DetailsScreen = ({ route }) => { 
  const { movieId } = route.params;
  const [movie, setMovie] = React.useState({});

  React.useEffect(() => {
    getMovie();
  }, []);
  
  

  const getMovie = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=841d7b4def08ddc32e8ee6cb00505794&language=en-US`)
      .then(response => response.json())
    setMovie(res);
  }
  
  
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{padding: 30}}>
        <View style={{ marginBottom: 20}}>
          <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 24, marginBottom: 40}}>{movie.title}</Text>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} style={{ width: 250,  alignSelf: 'center', height: 300 }} />
        </View>  
        <View style={{ paddingTop: 5 }}>
          <Text>Popularity: {movie.overview}</Text>
          <View style={{ flexDirection: 'row', marginTop: 30}}>
            <Text>Popularity: {movie.popularity} | </Text>
            <Text>Release Date: {movie.release_date}</Text>
          </View>
          </View>  
        </View>
    </ScrollView>
  );
}

export default DetailsScreen;
