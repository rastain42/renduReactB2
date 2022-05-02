import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { whoami } from '../api/users';
import Swiper  from 'react-native-deck-swiper';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import {  Button , Image, ImageBackground} from 'react-native';

export default function EditScreenInfo({ path }: { path: string }) {

  const getCardsLength = (size: number) => {
    const res: any = []
    for(let i = 0; i < size  ; i++) {
      res.push(i);
    }
    return res
  }

  const cardsItem = [
    {
      title: 'Card 1',
    },
    {
      title: 'Card 2',
    },
    {
      title: 'Card 3',
    },
    {
      title: 'Card 4',
    },
    {
      title: 'Card 5',
    }
  ]
  console.log(getCardsLength(cardsItem.length))
  const image = { uri: "https://reactjs.org/logo-og.png" };

  return (
      <View style={styles.container}>
        <Swiper
            cards={[1]}
            renderCard={(card: number) => {
                return (
                    <View style={styles.card}>
                        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Inside</Text>
    </ImageBackground>
                    </View>
                )
            }}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={0}
            marginBottom={140}
            marginTop={10}
            backgroundColor={'#FFFFFF'}
            stackSize= {10}>
        </Swiper>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 12,
    backgroundColor: "#FFFFFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "#966ed7",
    margin: 12,
  },
  tinyLogo: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
}
});
