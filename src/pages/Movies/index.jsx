import * as React from 'react';
import {  ScrollView } from 'react-native';
import MovieItem from '../../components/MovieItem';
import { CheckIcon, Select, View } from 'native-base';
import LoadingActivity from '../../components/LoadingActivity';


const Movies = () => {
  const [movies, setMovies] = React.useState([]);
  const [category, setCategory] = React.useState('now_playing');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    getMovie();
   }, [category]);

  const getMovie = async () => {
    setLoading(true);
    const res = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=841d7b4def08ddc32e8ee6cb00505794&language=en-US&page=1`)
      .then(response => response.json())
    
    setMovies(res.results);
    setLoading(false);
  }
   
  return (
    <ScrollView style={{ flex: 1 }}>
      {loading && <LoadingActivity />}
      {!loading && <>
        <View style={{ marginHorizontal: 100, marginVertical: 20 }}>
          <Select
            selectedValue={category}
            minWidth="180"
            height={10}
            accessibilityLabel="Choose Movies Category"
            placeholder="Choose Movies Category"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => {
              setCategory(itemValue);
            }}
          >
            <Select.Item label="Now Playing" value="now_playing" />
            <Select.Item label="Popular" value="popular" />
            <Select.Item label="Top Rated" value="top_rated" />
            <Select.Item label="Upcoming" value="upcoming" />
          </Select>
        </View>
        {movies.map((movie, index) => (
          <MovieItem movie={movie} key={index} />
        ))}
      </>}
    </ScrollView>
  );
}


export default Movies;
