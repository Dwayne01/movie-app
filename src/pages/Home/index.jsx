import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import Movies from '../Movies';
import Search from '../Search';
import Tvshows from '../Tvshows';

const renderScene = SceneMap({
  first: Movies,
  second: Search,
  third: Tvshows,
});


const HomeScreen = () => {
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


export default HomeScreen;