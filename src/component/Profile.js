import React, { useState } from 'react';
import { StyleSheet,Text,View,ScrollView,TouchableOpacity,Image,ActivityIndicator,Dimensions,} from 'react-native';
import { List  , TouchableRipple , Switch} from 'react-native-paper';
import database from "../Backend/Fire"

import data from "../Backend/Lib"
export default function Profile(props) {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isDarkMode, setisDarkMode] = useState(false);
 const[username , setUsername] = useState("");
 const[email , setEmail] = useState("");
 const[totalUsed , setTotalUsed] = useState(null);
const { navigation } = props.route;
React.useEffect(()=>{
  database.once("user/"+database.getUid() , (snap)=>{
    setUsername(snap.val().username)
    setEmail(snap.val().email)
    setTotalUsed(snap.val().used)
  })
  database.fb("user/"+database.getUid()).on("child_changed" , (snap)=>{
     setTotalUsed(parseInt(snap.val()))
  })
}, [])





  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const onToggleSwitchDarkMode = () => setisDarkMode(!isDarkMode);
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          <View>
            <Image
              style={styles.coverImage}
              source={{ uri: 'https://picsum.photos/500/500?random=211' }}
            />
          </View>
          <View style={styles.profileContainer}>
            {/* Profile Details */}
            <View>
              {/* Profile Image */}
              <View style={styles.profileImageView}>
                  <Image
                  style={styles.profileImage}
                  source={{
                    uri: "https://picsum.photos/500/500?random=211",
                  }}
                /> 
              </View>
              {/* Profile Name and Bio */}
              <View style={styles.nameAndBioView}>
                <Text style={styles.userFullName}>{username}</Text>
                <Text style={styles.userBio}>{email}</Text>
                <Text style={styles.userBio}>Total Used : {data.fileSize(totalUsed)} /infinity</Text>
              </View>
              {/* Interact Buttons View */}
              <View style={styles.interactButtonsView}>
                <TouchableOpacity style={styles.interactButton}  onPress={()=> navigation.navigate("EditProfile")}>
                  <Text style={styles.interactButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.interactButton,
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: '#4b7bec',
                  }}
                  onPress={()=>{
                    database.signOut();
                    navigation.navigate('Login');
                  }}
                >
                  <Text
                    style={{ ...styles.interactButtonText, color: '#4b7bec' }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Profile Content */}
        <TouchableRipple
    onPress={() => console.log('Pressed')}
    rippleColor="rgba(0, 0, 0, .32)"
  >
  <List.Item
    title="Notifications"
    left={props => <List.Icon {...props} icon="bell" />}
    right={props =><Switch value={isSwitchOn} onValueChange={onToggleSwitch} />}
  />
  </TouchableRipple>
        <TouchableRipple
    onPress={() => console.log('Pressed')}
    rippleColor="rgba(0, 0, 0, .32)"
  >
  <List.Item
    title="DarkMode"
    left={props => <List.Icon {...props} icon="white-balance-sunny" />}
    right={props =><Switch value={isDarkMode} onValueChange={onToggleSwitchDarkMode} />}
  />
  </TouchableRipple>
        <TouchableRipple
    onPress={() => console.log('Pressed')}
    rippleColor="rgba(0, 0, 0, .32)"
  >
  <List.Item
    title="Privacy&Policy"
    left={props => <List.Icon {...props} icon="cloud-print" />}
  />
  </TouchableRipple>
        <TouchableRipple
    onPress={() => console.log('Pressed')}
    rippleColor="rgba(0, 0, 0, .32)"
  >
  <List.Item
    title="FAQs"
    left={props => <List.Icon {...props} icon="note-text" />}
  />
  </TouchableRipple>
          </View>
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: { height: 300, width: '100%' },
  profileContainer: {
    // height: 1000,
    backgroundColor: '#fff',
    marginTop: -100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileImageView: { alignItems: 'center', marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  nameAndBioView: { alignItems: 'center', marginTop: 10 },
  userFullName: { fontFamily: 'SSBold', fontSize: 26 },
  userBio: {
    fontFamily: 'SSRegular',
    fontSize: 18,
    color: '#333',
    marginTop: 4,
  },
  interactButtonsView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  interactButton: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#4b7bec',
    margin: 5,
    borderRadius: 4,
  },
  interactButtonText: {
    fontFamily: 'SSBold',
    color: '#fff',
    fontSize: 18,
    paddingVertical: 6,
  },
});