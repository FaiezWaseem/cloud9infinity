import React from 'react';
import { Image , TouchableOpacity , ActivityIndicator , View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import {createDir , save , loadFile , getAllFilesIn , getFileInfo , decUrl} from "../Backend/SaveFile";

export default function ImageCache({obj , styles , onPress}){
   
 const [avatar , setAvatar] = React.useState();
 const [downloading , setdownloading] = React.useState(false);

  const path = FileSystem.documentDirectory+ `${obj.imageName}.png`; 
  React.useEffect(()=>{
    if(obj.self != null ){[
      console.log(obj)
    ]}
    createDir(path);
     getFileInfo(path ,(res)=>{
     if(res.exists){
       setAvatar(path);
      }else{
     decUrl(obj.url , (url)=>{
        setdownloading(true)
     console.log('downloading image to cache');
       const newImage =  FileSystem.downloadAsync(url, path)
        .then(({ uri }) => {
    console.log('Finished downloading to ', uri);
    setdownloading(false)
    setAvatar(uri);
  })
  .catch(error => {
    setdownloading(false)
    console.error(error);
  });
       
       })
     }
     })
  })

  return (
    <View>
    { downloading ? <ActivityIndicator size="large" color="#00ff00" /> :  <TouchableOpacity onPress={onPress} >
     <Image style={styles} source={{uri: avatar, }}/>
   </TouchableOpacity >}
   </View>
  )
}