import * as React from 'react';
import { Avatar, IconButton ,  Provider  } from 'react-native-paper';
import { View  , ScrollView , Dimensions , BackHandler , ActivityIndicator , ToastAndroid} from "react-native";

//---------Importing Component----------------
import FolderCard from "./AlbumsTab/FolderCard";
import FileCard from "./AlbumsTab/FileCard";
import ImageCard from "./AlbumsTab/ImageCard";
import BottomFab from "./AlbumsTab/BottomFab";
import {ModalBox} from "./AlbumsTab/BottomFab";


import database from "../Backend/Fire"


const AlbumsTab = (props) =>{ 
    const [title  , setTitle] = React.useState("Home");
    const [folderKey  , setfolderKey] = React.useState("");
    const [currentPath  , setcurrentPath] = React.useState("root");
    const [previousPath , setPreviousPath] = React.useState("");
  const [directory  , setDirectory] = React.useState([]);
      const hideDialog = () => setVisible(false);
    const [visible, setVisible] = React.useState(false);
  const [isLoading  , setLoading] = React.useState(true);
  const { navigation }= props.route;
  React.useEffect(()=>{
   loadNext();
  } , [currentPath])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title.length > 25 ? title.substr(0 , 25) + "..." : title ,
      headerLeft: () => (
        <></>
      ),
      headerRight: () => (
        <IconButton {...props} icon="autorenew" onPress={() => {loadNext()}} />
      ),
      
    });
  }, [title]);



function loadNext(){
   setLoading(true)
  setDirectory([]);
  database.off("uploads/"+database.getUid()+"/");
  database.off("uploads/"+database.getUid()+"/"+currentPath+"/");
  if(currentPath === "root"){
        database.on("uploads/"+database.getUid()+"/" , (snap)=>{
         setDirectory( item =>{
           return [
             snap.val(),
             ...item , 
           ]
         })
      setLoading(false)
    })
  }else{
          database.on("uploads/"+database.getUid()+"/"+currentPath+"/" , (snap)=>{
           if((snap.val().isFile || snap.val().key || snap.val().time || snap.val().uid || snap.val().foldername)){
              setDirectory( item =>{
           return [
             snap.val(),
             ...item , 
           ]
         })
           }
     setLoading(false)
    })
  }
}
function loadPrev(){
  if(currentPath === "root"){
     console.log("ALready in Root Directory")
  }else{
     setLoading(true)
      setDirectory([]);
     database.off("uploads/"+database.getUid()+"/");
  database.off("uploads/"+database.getUid()+"/"+currentPath+"/");
  database.off("uploads/"+database.getUid()+"/"+previousPath+"/");
     const Last = currentPath.substring(currentPath.lastIndexOf('/') + 1);
     const lastTitle = title.substring(title.lastIndexOf('/') + 1)
   if(currentPath === Last){
     setPreviousPath("");
     setcurrentPath("root");
     setTitle("Home")
   }else{
 var goBack = currentPath.replace("/"+Last , "");
 var m = title.replace("/"+lastTitle , "");
  var middle = goBack.replace("root" , "");
   setcurrentPath(goBack)
    setPreviousPath(middle)
     setTitle(m)
   }
 
  }
}
 React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [title]);

const backAction = () => {
             if(title === "Home" ){
               BackHandler.exitApp()
                  return true;
             }else{
               loadPrev()
                   return true;
             } 
  
    };

 
const isImage=(file)=>{
  if(file.includes("png") || file.includes("PNG") || file.includes("jpeg") || file.includes("gif") || file.includes("jpg") ){
    return true;
  }else{ return false}
}

const folderRename = (value) =>{
  console.log(folderKey)
  const uid = database.getUid();
  if(currentPath === "root"){
    database.update("uploads/"+uid+"/"+folderKey , {
      foldername : value
    })
  }else{
        database.update("uploads/"+uid+"/" + currentPath +"/" +folderKey , {
      foldername : value
    })
  }
  ToastAndroid.show("Folder Renamed ,Refresh To See Changes" , 2000)
  hideDialog();
}
  return(
    <View style={{ flex : 1}}>
    <ScrollView     showsVerticalScrollIndicator={false} >
    { isLoading ?     <ActivityIndicator size="large" color="#00ff00" /> :<></>}
    {
      directory.map((item)=>{
        const file = item.filename;
        const obj = {
          currentPath : currentPath,
          setcurrentPath : setcurrentPath,
          previousPath : previousPath , 
          setPreviousPath : setPreviousPath,
          title : title , 
          setTitle : setTitle,
          navigation : navigation
        }
          if(item.isFile){
            //if it is file 
            if(isImage(file)){
              return <ImageCard item={item} state={obj} />
            }else{
              return <FileCard item={item} state={obj} />
            }
           }else{
             //if it is folder
         return <FolderCard item={item} state={obj} callback={(key)=>{setVisible(true) ; setfolderKey(key)}} />
     }
      })
    }
  </ScrollView>
  <BottomFab  navigation={navigation} path={currentPath} />
  <Provider>
   <ModalBox state={visible} hideDialog={hideDialog} path={currentPath}  callback={(value)=>folderRename(value)} />
   </Provider>
  </View>
);
}


export default AlbumsTab;