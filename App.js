import React, { useEffect, useState, useRef, Component } from 'react';
import { View, StyleSheet,FlatList, ScrollView, Dimensions,Alert, Text, SafeAreaView } from 'react-native';
//import { Constants } from 'expo';

const { width } = Dimensions.get('window');

const Card = ({ style, id }) => {

  return <View>
    <View style={style} />
    <Text>
      {id}
    </Text>
  </View>
}

const viewabilityConfig = {
  viewAreaCoveragePercentThreshold: 80
}


const styles = StyleSheet.create({
  container: {},
  circle: {
    backgroundColor: 'gray',
    width: 50, 
    height: 50, 
    borderRadius: 25
  },
  view: {
    marginTop: 100,
    backgroundColor: 'red',
    width: width - 80,
    margin: 10,
    height: 200,
    borderRadius: 10,
    //paddingHorizontal : 30
  },
  view2: {
    marginTop: 100,
    backgroundColor: 'blue',
    width: width - 80,
    margin: 10,
    height: 200,
    borderRadius: 10,
    //paddingHorizontal : 30
  },
  view3: {
    marginTop: 100,
    backgroundColor: 'green',
    width: width - 80,
    margin: 10,
    height: 200,
    borderRadius: 10,
    //paddingHorizontal : 30
  },
  circles: {
    width: width,
    flexDirection: 'row', 
    justifyContent: 'space-around'
  }
});


const data = [
  {
    id: 0,
    color: 'red',
    style: styles.view,
    label: "A red credit card"
  },
  {
    id: 1,
    color: 'blue',
      style: styles.view2,
      label: 'a blue credit card'
  },
  {
    id: 2,
    color: 'green',
    style: styles.view3,
    label: 'A green credit card'
  }
]

const Carousel = () =>  {
  
  // componentDidMount() {
	// 	setTimeout(() => {this.scrollView.scrollTo({x: -30}) }, 1) // scroll view position fix
	// }

  const [viewable, setViewable] = useState(0)

    const onViewableItemsChanged = (visibilityStates) => {
        const viewable = visibilityStates.changed.filter(item => item.isViewable)[0]?.index
        setViewable(viewable)
    }

    const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }])

    return (
      <SafeAreaView>
        <Text>Label: {data[viewable]?.label}</Text>
        <FlatList 
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          horizontal={true}
          snapToAlignment="start"
          decelerationRate={"fast"}
          snapToInterval={width - 80}
          data={data}
          keyExtractor={({ id}) => id}
          renderItem={({ item }) => <Card {...item} />}
        />
        <View style={styles.circles}>
          {data.map((_, index) => <View key={index} style={{...styles.circle, backgroundColor: viewable === index ? data[index].color: 'gray' }} />)}
        </View>
      </SafeAreaView>
    );
}

export default Carousel;

