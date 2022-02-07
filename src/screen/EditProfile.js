import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Button,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import database from "../Backend/Fire";

const EditProfile = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [Location, setLocation] = useState('');
  const [number, setnumber] = useState('');
  React.useEffect(()=>{
    database.once("user/"+database.getUid() , (snap)=>{
        setName(snap.val().username)
        setEmail(snap.val().email)
    })
  }, [])

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
       "hardwareBackPress",
       backAction
     );
 
     return () => backHandler.remove();
   }, []);
 const backAction = () => {
    props.navigation.goBack();
   return true;
     };
  return (
    <ScrollView style={styles.container}>
     <View style={{...styles.comp, height: 200 }}>
        <Text style={styles.compHeading}>Avatar & Cover</Text>
        <View style={styles.horizontalLine} />
        <View style={styles.coverContainer}>
          <Image
            source={{uri: "https://picsum.photos/500/500?random=211"}}
            style={styles.cover}
            resizeMode="contain"
          />
          <View style={styles.coverOverlay} />
          <Pressable style={styles.editButton}>
            <Icon
              name="pencil"
              color="#fff"
              size={20}
              style={styles.coverButton}
            />
          </Pressable>
        </View>
        <View style={styles.avtarContainer}>
          <Image
            source={{uri: "https://picsum.photos/500/500?random=211"}}
            style={styles.avtar}
            resizeMode="cover"
          />
          <View style={styles.overlay} />
          <Pressable>
            <Icon
              name="pencil"
              color="#fff"
              size={20}
              style={styles.absoluteElem}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.comp}>
        <Text style={styles.compHeading}>Personal Details</Text>
        <View style={styles.horizontalLine} />
        <TextInput
          value={name}
          style={styles.input}
          onChange={val => setName(val)}
          placeholder="Name"
          placeholderTextColor="#b8b8b8"
          maxLength={32}
        />
        <TextInput
          value={Location}
          style={styles.input}
          onChange={val => setLocation(val)}
          placeholder="Location"
          placeholderTextColor="#b8b8b8"
          maxLength={100}
        />
      </View>
 
      <View style={styles.comp}>
        <Text style={styles.compHeading}>Account Details</Text>
        <View style={styles.horizontalLine} />
        <TextInput
          value={email}
          style={styles.input}
          onChange={val => setEmail(val)}
          placeholder="Email"
          placeholderTextColor="#b8b8b8"
          editable={false}
          selectTextOnFocus={false}
        />
        <TextInput
          value={"**********"}
          style={styles.input}
          onChange={val => setName(val)}
          placeholder="Password"
          placeholderTextColor="#b8b8b8"
          editable={false}
         selectTextOnFocus={false}
        />
        <TextInput
          value={number}
          style={styles.input}
          onChange={val => setnumber(val)}
          placeholder="Mobile number"
          keyboardType="phone-pad"
          placeholderTextColor="#b8b8b8"
          maxLength={14}
        />
      </View>
      <View style={styles.btnContainer}>
      <Button
        styleProps={styles.sendButton}
        title="Submit"
        textStyle={styles.buttonText}
        isLoading={false}
        onPress={() => props.navigation.goBack()}
      />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfdff',
  },
  btnContainer : {
      flexDirection : "row" , 
      justifyContent : "center",
      alignItems : "center"
  },
  comp: {
    margin: 10,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    width: '93%',
    alignSelf: 'center',
  },
  compHeading: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16.4,
    textTransform: 'capitalize',
  },
  horizontalLine: {
    width: '100%',
    borderBottomColor: '#b8b8b8',
    borderBottomWidth: 1.4,
    marginBottom: 10,
    marginTop: 5,
  },
  input: {
    borderBottomColor: '#b8b8b8',
    borderBottomWidth: 1.4,
    width: '100%',
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: '#212121',
  },
  coverContainer: {
    width: '100%',
    height: 145,
    borderRadius: 8,
  },
  cover: {
    width: '100%',
    height: 145,
    borderRadius: 8,
  },
  avtarContainer: {
    position: 'absolute',
    width: 85,
    height: 85,
    borderRadius: 85 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    top: 120,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avtar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    borderRadius: 8,
  },
  absoluteElem: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 95,
    right: 7,
  },
  sendButton: {
    backgroundColor: '#04abf2',
    width: '40%',
    height: 45,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
  },
});

export default EditProfile;
