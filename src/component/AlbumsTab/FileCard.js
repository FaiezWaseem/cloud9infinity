import * as React from 'react';
import { Avatar, Card, IconButton , TouchableRipple  , Snackbar   } from 'react-native-paper';
import { View  , ScrollView , Text , ToastAndroid } from "react-native";
import data from "../../Backend/Lib"
import BottomModal from "../../utils/BottomModal"
import database from "../../Backend/Fire"
import { Dirs, FileSystem as File } from 'react-native-file-access';
import ProgressBar from "react-native-animated-progress";
import {share , decUrl} from "../../Backend/SaveFile"

const FileCard =({item , state}) =>{

const [isVisible , setVisble] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [isFileDownloading  , setisFileDownloading] = React.useState(false)
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);
 

 const onDelete = () =>{
  if(state.currentPath === "root"){
      database.dlt("uploads/"+database.getUid() , item.key)
  }else{
     const current = state.currentPath;
      database.dlt("uploads/"+database.getUid()+ "/"+current , item.key)
  }
  onToggleSnackBar();
  setVisble(false)
  
   }
 const onDownload = () =>{
  setVisble(false)
  setisFileDownloading(true)
   const url = `https://anonfiles.com/${item.fileId}`
   var path = "/Download/cloud9infinity/";
   const fileExtension = item.filename.substring(item.filename.lastIndexOf('_') + 1);
  const FIlename = item.filename.replace("_"+fileExtension , "."+fileExtension);
  if(data.isVideo(fileExtension)){
    path += "Media/"
  }else{
    path += "Document/"
    
  }
   decUrl(url , (download_url)=>{
    File.fetch(download_url, {
      path:  Dirs.SDCardDir +path+FIlename,
    }).then ((res)=>{
      if(res.ok){
        console.log("downloaded To : /Download/cloud9infinity/"+path)
        ToastAndroid.show("Downloaded To : /Download/cloud9infinity/"+path , 3000)
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

  return (<View style={{ margin : 5}}>
   <Card >   
         <TouchableRipple
    onPress={() => data.isVideo(item.filename) ? state.navigation.navigate("Videoplayer" , { item : item}) : console.log("pressed")}
    rippleColor="rgba(0, 0, 0, .22)"
  >
  <Card.Title
    title={item.filename}
    subtitle={data.convertTime(item.time)}
    left={(props) => <Avatar.Icon {...props} icon={data.isVideo(item.filename) ?  "video"  :"file"} />}
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {setVisble(true)}} />}
    
  />
  </TouchableRipple>
   </Card>
   {isFileDownloading ? <ProgressBar height={5} indeterminate backgroundColor="#800080" /> : <></>}
  
   <BottomModal isVisible={isVisible} dismiss={()=>setVisble(false)} >
    <Text style={{ fontSize : 22 , padding : 16 , color: "#800080"}}>{item.filename}</Text>
    <Text style={{ fontSize : 23 , padding : 16}}>File Size : {item.size}</Text>
    <Text style={{ fontSize : 23 , padding : 16}}>Uploaded On : {data.convertTime(item.time)}</Text>
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
export default FileCard;