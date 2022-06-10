import * as React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import {CheckIcon, Select} from 'native-base';
import MovieItem from '../../components/MovieItem';



const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [category, setCategory] = React.useState('movie');

  const onChangeSearch = (query) => { 
    setSearchQuery(query);
  }

   React.useEffect(() => {
    getMovie();
   }, []);

  const getMovie = async () => {
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=841d7b4def08ddc32e8ee6cb00505794&language=en-US&page=1')
      .then(response => response.json())
    
    setMovies(res.results);
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <View style={{padding: 20}}>
        <Text style={{marginBottom: 10}}>Search Movie/TV Shows Name <Text style={{ color: 'red' }}>*</Text></Text>
      
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />

        <View style={{marginTop: 20}}>
          <Text style={{marginBottom: 10}}>Choose Search Type <Text style={{ color: 'red' }}>*</Text></Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
            <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', width: 120, backgroundColor: 'red', paddingVertical: 15, paddingHorizontal: 20,  borderRadius: 5}}>
              <EvilIcons name="search" size={24} style={{alignItems: 'center'}} color="#fff" />
              <Text style={{color: '#fff'}}>Search</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={{marginTop: 10}}>Please select a search type</Text>
        
        </View>
      </View>
      <View>
          {movies.map((movie, index) => (
            <MovieItem movie={movie} key={index} />
          ))}
      </View>
    </ScrollView>
  );
}

export default Search;