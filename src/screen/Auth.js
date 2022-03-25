
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import database from "../Backend/Fire";

const signup = "Don't Have an Account Click Here"
const signin = "Have an Account Click Here"

export const Input = ({
  placeholder,
  icon,
  value,
  onChange,
  securePass,
  isPass,
  secureChange,
   }) => {
  return (
    <View style={styles.inputContainer}>
      <Icon color="#9097a3" size={24} name={icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#9097a3"
        value={value}
        onChangeText={onChange}
        style={styles.input}
        secureTextEntry={securePass}
      />
      {isPass && (
        <Pressable onPress={secureChange}>
          <Icon
            name={securePass ? 'eye-off-outline' : 'eye-outline'}
            color="#9097a3"
            size={23}
          />
        </Pressable>
      )}
    </View>
  );
};

const Login = props => {
  const [isSecure, setIsSecure] = useState(true);
  const [isSigning, setisSigning] = useState(true);
  const [image, setImage] = useState(null);
  const [email , setEmail] = useState("");
  const [pass , setPass] = useState("");
  const [name , setName] = useState("");

  React.useEffect(()=>{
    database.isAuthenticated((user)=>{
      if(user){
     props.navigation.navigate("Home");
      }
    })
  },[])

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <View style={styles.contentContainer}>
        <Text style={styles.heading}> {  isSigning ? "Sign-In" : "Sign-Up"}</Text>
        <View style={styles.socialContainer}>
         
         
        </View>
        {
          !isSigning ?     <Input placeholder="Name" icon="at-outline" onChange={(value)=> {
          setName(value)
          }} /> : <></>
        }
    
        <Input placeholder="Email ID" icon="at-outline" onChange={(value)=> {
          setEmail(value)
          }} />
        <Input
          placeholder="Password"
          icon="lock-closed-outline"
          isPass
          securePass={isSecure}
          secureChange={() => setIsSecure(!isSecure)}
          onChange={(value)=> {
          setPass(value)
          }}
        />
        {
          isSigning ?         <Button
          title="Login"
          styleProps={styles.button}
          textStyle={styles.buttonText}
          onPress={()=>{
            if(email != "" || pass != ""){
            database.signIn(email.trim() , pass.trim());
            }
          }}
        /> :
                 <Button
          title="Create account"
          styleProps={styles.button}
          textStyle={styles.buttonText}
          onPress={()=>{
        database.signUp(email.trim() , pass.trim() , (id)=>{ database.fset("user/"+id , {
          uid : id,
          createdAt : database.timeStamp(),
          email : email,
          username : name,
          used : 0,
        })})
          }}
        />

        }


      </View>
      <Text style={{ margin : 10 , color : "purple"}}   onPress={()=> isSigning ? setisSigning(false) : setisSigning(true)}>   { isSigning ? signup : signin}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent : "center"
  },
  contentContainer: {
    marginHorizontal: 15,
  },
  heading: {
    color: '#192948',
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    marginBottom: 10,
    marginTop: 15,
  },
  inputContainer: {
    borderBottomColor: '#e4e6e5',
    borderBottomWidth: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  input: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: '#212121',
    width: '88%',
  },
  button: {
    backgroundColor: '#0165ff',
    borderWidth: 0,
    width: 140,
    height: 60,
  },
  buttonText: {
    color: '#fff',
  },
  loginWith: {
    textAlign: 'center',
    color: '#9097a3',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },

  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  profileContainer: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    elevation: 6,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: 145,
    height: 145,
    borderRadius: 145 / 2,
  },
  addProfile: {
    position: 'absolute',
    bottom: -8,
    width: 35,
    height: 35,
    borderRadius: 33 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0165ff',
  },

  modalText: {
    color: '#212121',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
  },
  inputLabel: {
    fontFamily: 'Roboto-Medium',
    fontSize: 22,
    color: '#414852',
    marginHorizontal: 4,
    marginVertical: 5,
    alignSelf: 'center',
  },
});

export default Login;

