import * as React from 'react';
import { StyleSheet, useWindowDimensions, Image, Text, View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Searchbar } from 'react-native-paper';
import AntDesign from '@expo/vector-icons/AntDesign';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import {CheckIcon, NativeBaseProvider, Select} from 'native-base';

const ModalOptions = () => { 
  const [modalVisible, setModalVisible] = React.useState(false);
  
  return (
    <View style={{width: '60%', }}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{flexDirection: 'row', justifyContent: 'space-between', borderColor: '#BFBFBF', borderStyle: 'solid', borderWidth: 1, paddingVertical: 15, paddingHorizontal: 20}}>
        <Text>movie</Text>
        <AntDesign name="down" size={24} color="#868686" />
      </TouchableOpacity>
      <Modal
        animated
        animationType="fade"
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}>
          <View>
            <Text>Hello</Text>
          </View>
      </Modal>
    </View>
  )
}

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

const FirstRoute = () => {
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

const SecondRoute = () => {
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

const ThirdRoute = () => {
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

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});


function HomeScreen() {
  const layout = useWindowDimensions();
   const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Movies' },
    { key: 'second', title: 'Search' },
    { key: 'third', title: 'TV Shows' },
  ]);

  return (
     <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}


function DetailsScreen({ route, navigation }) { 
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

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Movie App" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
