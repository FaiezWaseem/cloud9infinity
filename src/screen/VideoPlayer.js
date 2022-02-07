import * as React from 'react';
import { View, StyleSheet, Button , Text  , BackHandler , ActivityIndicator} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { decUrl } from '../Backend/SaveFile';
export default function Videoplayer(props) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [uri, setUri] = React.useState(null);
  const [isBuffering , setBuffering] = React.useState(true)
  const  item  = props.route.params.item;
 React.useEffect(()=>{
     decUrl(`https://anonfiles.com/${item.fileId}` , (link)=>{
        setUri(link)
     })
 },[])

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
function changestatus(status){
        if(status.error){
         console.log("======Video Load Error========")
        }
        setStatus(() => status)
        setBuffering(status.isBuffering)          
}
  return (
    <View style={styles.container}>
        <View  style={styles.buttons}>
         <Text style={styles.title}>{item.filename}</Text>
        </View>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: uri ? uri : 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => changestatus(status)}
        autoplay={true}
      />
      {
          isBuffering ?       <View style={styles.buttons}>
          <ActivityIndicator  size={"large"} color="#fff" />
        </View> : <></>
      }

      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title : { fontSize : 22 ,color : "purple" , fontWeight : "bold" , marginBottom : 8}
});
