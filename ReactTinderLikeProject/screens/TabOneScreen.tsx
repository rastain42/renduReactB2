import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <SafeAreaView style={styles.container}>

      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </SafeAreaView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FFFFFF"
  },

  
});