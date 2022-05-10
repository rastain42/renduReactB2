import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Button } from 'react-native';
import { theme } from '../core/theme'
import { logout } from '../features/user'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import axios from 'axios'
import {API_URL} from '@env'
import { useDispatch, useSelector } from 'react-redux';
// import {getImages } from '../api/users'

export default function TabTwoScreen() {
    const [usersImages, setusersImages] = useState([]);
    const user = useSelector((state) => state.user.value);
    console.log(user.id)
    
    const getImages = () => {
        axios.get('https://matcherapi.herokuapp.com/' + '/users/' + user.id+ 'app-files')
        .then(res => {
            return res.data
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    useEffect(() => {
        try {
            const response: any = getImages()
            setusersImages(response)
            
        } catch (error) {
            console.log(error)
        }
        // Create an scoped async function in the hook
    }, []);
    return (
        <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <ProfileScreen />
    </View>
  );
}

export function ProfileScreen(){
    
    const dispatch = useDispatch();
    
        
        // const user = useSelector((state) => state.user.value);
        // console.log(user)
          
    
    
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleBar}>
            
            </View>
      <Button
        title="Se déconnecter"
        onPress={() => dispatch(logout())}
      />

            <View style={styles.subcontainer}>
                <View style={styles.profileImage}>
                    <Image source={require("../assets/images/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
                </View>
                <View style={styles.dm}>
                    <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                </View>
                <View style={styles.active}></View>
                <View style={styles.add}>
                    <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Julie</Text>
                <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Photographer</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
                    <Text style={[styles.text, styles.subText]}>Posts</Text>
                </View>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                    <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
                    <Text style={[styles.text, styles.subText]}>Followers</Text>
                </View>
                <View style={styles.statsBox}>
                    <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                    <Text style={[styles.text, styles.subText]}>Following</Text>
                </View>
            </View>

            <View style={{ marginTop: 32 }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/images/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/images/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                    <View style={styles.mediaImageContainer}>
                        <Image source={require("../assets/images/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                    </View>
                </ScrollView>
            </View>
            <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
            <View style={{ alignItems: "center" }}>
                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                            Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.recentItem}>
                    <View style={styles.activityIndicator}></View>
                    <View style={{ width: 250 }}>
                        <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                            Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: theme.colors.surface,

  },

  subcontainer: {
    alignSelf: "center" ,
    marginTop: 24,
  },
  text: {
      fontFamily: "HelveticaNeue",
      color: "#52575D"
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
      marginHorizontal: 16
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
  },
  dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32
  },
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  mediaCount: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: "50%",
      marginTop: -50,
      marginLeft: 30,
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      shadowColor: "rgba(0, 0, 0, 0.38)",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 20,
      shadowOpacity: 1
  },
  recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  }
});

function setData(json: any) {
    throw new Error('Function not implemented.');
}
