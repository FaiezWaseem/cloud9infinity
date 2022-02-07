import React from 'react';
import {View, StyleSheet ,Image} from 'react-native';
import database from "../Backend/Fire"

const Splash = (props) => {

    React.useEffect(()=>{
        database.isAuthenticated((user)=>{
          if(user){
              setTimeout(()=>{ props.navigation.navigate("Home");} , 2000)
        }else{
         props.navigation.navigate("Login");

          }
        })
      },[])
    

    return (
        <View style={styles.container}>
            <Image  style={styles.image} source={require("../../assets/cloud.gif")}/>
        </View>
    );
}

const styles = StyleSheet.create({
    image : {
        width : 320,
        height : 200
    }
    ,
    container : {
        flex : 1 , 
        justifyContent : "center",
        alignItems : "center" , 
        backgroundColor : "#fff"
    }
})

export default Splash;
