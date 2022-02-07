import * as React from 'react';
import { StyleSheet , Text , View  , PermissionsAndroid , StatusBar} from 'react-native';
import Route from "./Route"


const requestReadPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "File Accesss Permission",
        message:
          "This App needs File Accesses Permission In Order To Function Properly",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use File");
    } else {
      console.log("permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};


export default function App() {
 
  React.useEffect(()=>{
    requestReadPermission();
  },[])

  return  (
    <View style={styles.container}>
       <StatusBar
        animated={true}
        backgroundColor="black" />
    <Route />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
