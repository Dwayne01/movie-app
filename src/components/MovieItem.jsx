import * as React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const MovieItem = ({ movie }) => {
  const navigation = useNavigation();
  return(
    <View key={movie.id} style={{ flexDirection: 'row', padding: 10 }}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }} style={{ width: 100, height: 100 }} />
      <View style={{ paddingHorizontal: 10, paddingTop: 5 }}>
        <Text style={{ fontWeight: 'bold' }}>{movie.title}</Text>
        <Text>Popularity: {movie.popularity}</Text>
        <Text>Release Date: {movie.release_date}</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Details', {
          movieId: movie.id,
        })} style={{ padding: 10, borderRadius: 5, width: 200, backgroundColor: 'blue' }}>
          <Text style={{ textAlign: 'center', color: '#fff' }}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default MovieItem;
