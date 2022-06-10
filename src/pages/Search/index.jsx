import * as React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MovieItem from '../../components/MovieItem';
import { Select, Input, Icon, FormControl, WarningOutlineIcon , CheckIcon } from "native-base";


const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [category, setCategory] = React.useState('');

  const onChangeSearch = (query) => { 
    setSearchQuery(query);
  }

  const getMovie = async () => {
    const res = await fetch(`https://api.themoviedb.org/3/search/${category}?api_key=841d7b4def08ddc32e8ee6cb00505794&language=en-US&query=${searchQuery}&page=1&include_adult=false`)
      .then(response => response.json())
    setMovies(res.results);
  }

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <View style={{padding: 20}}>
        <Text style={{marginBottom: 10}}>Search Movie/TV Shows Name <Text style={{ color: 'red' }}>*</Text></Text>
      
        <FormControl isInvalid={!searchQuery} w="100%" maxW="300px">
        <Input
          placeholder="i.e. James Bond, CSI"
          width="100%"
          borderRadius="4"
          py="3"
            px="1"
            onChangeText={onChangeSearch}
          fontSize="14"
          mt="3"
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size="6"
              color="gray.400"
              as={<MaterialIcons name="search" />}
            />
          }
        />
      </FormControl>
       

        <View style={{marginTop: 20}}>
          <Text style={{marginBottom: 10}}>Choose Search Type <Text style={{ color: 'red' }}>*</Text></Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <FormControl isInvalid={!category} w="50%">
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
                <Select.Item label="Tv Shows" value="tv" />
                <Select.Item label="Movies" value="movie" />
              </Select>
            </FormControl>
            <TouchableOpacity onPress={() => getMovie()} style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', width: 120, backgroundColor: 'red', paddingVertical: 15, paddingHorizontal: 20,  borderRadius: 5}}>
              <EvilIcons name="search" size={24} style={{alignItems: 'center'}} color="#fff" />
              <Text style={{color: '#fff'}}>Search</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={{marginTop: 10}}>Please select a search type</Text>
         {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          Try different from previous passwords.
        </FormControl.ErrorMessage> */}
        </View>
      </View>
      <View>
        {movies.length === 0 && <Text>Please initiate search</Text>}
          {movies.map((movie, index) => (
            <MovieItem movie={movie} key={index} />
          ))}
        
      </View>
    </ScrollView>
  );
}

export default Search;