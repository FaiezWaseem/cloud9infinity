import * as React from 'react';
import { Avatar, Card, IconButton , TouchableRipple , Snackbar  } from 'react-native-paper';
import { View  , Text , ActivityIndicator , TouchableOpacity  , ToastAndroid} from "react-native";
import data from "../../Backend/Lib"
import * as FileSystem from 'expo-file-system';
import {createDir , getFileInfo , decUrl , share} from "../../Backend/SaveFile";
import BottomModal from "../../utils/BottomModal"
import database from "../../Backend/Fire"
import ProgressBar from "react-native-animated-progress";
import { Dirs, FileSystem as File } from 'react-native-file-access';


const ImageCard = ({item , state}) =>{ 
const [isVisible , setVisble] = React.useState(false);
   const [avatar , setAvatar] = React.useState();
 const [downloading , setdownloading] = React.useState(false);
 const [visible, setVisible] = React.useState(false);
 const [isFileDownloading  , setisFileDownloading] = React.useState(false)

const path = FileSystem.documentDirectory+ `${item.filename}.png`; 
 React.useEffect(()=>{

    createDir(path);
     getFileInfo(path ,(res)=>{
     if(res.exists){
       setAvatar(path);
      }else{
     decUrl( `https://anonfiles.com/${item.fileId}` , (url)=>{
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
} , [])


  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
 

 const onDelete = () =>{
  if(state.currentPath === "root"){
      database.dlt("uploads/"+database.getUid() , item.key)
  }else{
     const current = state.currentPath;
     const previous = state.previousPath;
      database.dlt("uploads/"+database.getUid()+ "/"+current , item.key)
  }
  onToggleSnackBar();
  setVisble(false);
 }
 const onDownload = () =>{
 setVisble(false)
  setisFileDownloading(true)
   const url = `https://anonfiles.com/${item.fileId}`
   const fileExtension = item.filename.substring(item.filename.lastIndexOf('_') + 1);
  const FIlename = item.filename.replace("_"+fileExtension , "."+fileExtension);

   decUrl(url , (download_url)=>{
    File.fetch(download_url, {
      path:  Dirs.SDCardDir +"/Download/cloud9infinity/Media/"+FIlename,
    }).then ((res)=>{
      if(res.ok){
        console.log("downloadedTo : /Download/cloud9infinity/Media/")
        ToastAndroid.show("Downloaded To :  /Download/cloud9infinity/Media/" , 3000)
        setisFileDownloading(false)
      }else{
        ToastAndroid.show("Downloading Error", 3000)
        setisFileDownloading(false)
      }
    })
    .catch((err)=> console.log(err))
   })
  }
 const onShare = () =>{
   share(`https://anonfiles.com/${item.fileId}`)
 }


  return ( <View style={{ margin : 8}}>
         <Card>
            { downloading ? <ActivityIndicator size="large" color="#00ff00" /> :  <TouchableOpacity  >
   <Card.Cover source={{ uri: avatar ? avatar : 'https://picsum.photos/700' }} />
   </TouchableOpacity >}
    
   <Card.Title
    title={item.filename}
    subtitle={data.convertTime(item.time)}
    left={(props) => <Avatar.Icon {...props} icon="image" />}
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {setVisble(true)}} />}
    
  />
  </Card>
  {isFileDownloading ? <ProgressBar height={5} indeterminate backgroundColor="#800080" /> : <></>}
   <BottomModal isVisible={isVisible} dismiss={()=>setVisble(false)} >
    <Text style={{ fontSize : 22 , padding : 16 , color: "#800080"}}>{item.filename}</Text>
    <Text style={{ fontSize : 20 , padding : 5}}>File Size : {item.size}</Text>
    <Text style={{ fontSize : 20 , padding : 2}}>Uploaded On : {data.convertTime(item.time)}</Text>
         <TouchableRipple
    onPress={onDelete}
    rippleColor="rgba(0, 0, 0, .22)"
  >
  <Card.Title
    title="Delete"
    left={(props) => <Avatar.Icon {...props} icon="delete" />}    
  />
  </TouchableRipple>
         <TouchableRipple
    onPress={onDownload}
    rippleColor="rgba(0, 0, 0, .22)"
  >
  <Card.Title
    title="Download"
    left={(props) => <Avatar.Icon {...props} icon="cloud-download" />}    
  />
  </TouchableRipple>
         <TouchableRipple
    onPress={onShare}
    rippleColor="rgba(0, 0, 0, .22)"
  >
  <Card.Title
    title="Share"
    left={(props) => <Avatar.Icon {...props} icon="share" />}    
  />
  </TouchableRipple>
   </BottomModal>
           <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={99000}>
        This File is Deleted Refresh To See changes
      </Snackbar>
  </View>
  )
}
export default ImageCard;