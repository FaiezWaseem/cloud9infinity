import * as React from 'react';
import { Avatar, Card, IconButton , TouchableRipple , Title  , Paragraph , Button ,  FAB, Portal, Provider  ,  Dialog , Snackbar } from 'react-native-paper';
import { View  , ScrollView , Text  , ToastAndroid} from "react-native";
import data from "../../Backend/Lib"
import BottomModal from "../../utils/BottomModal"
import database from "../../Backend/Fire"
import {Input} from "../../screen/Auth"

const FolderCard =({item , state , callback}) =>{
 const onclick = () =>{
   state.setPreviousPath(state.currentPath);
   state.setcurrentPath( (val)=>{
     if(val === "root"){
        return item.key;
     }else{
     return val + "/"+item.key
     }
   })
   state.setTitle( (val)=>{
    return val + "/"+item.foldername
   })
 }


const [isVisible , setVisble] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

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
  setVisble(false)
  
   }
const onRenameFolder = () =>{
 setVisble(false);
 callback(item.key);
 }





  return (<View style={{ margin : 5}}>
   <Card>
         <TouchableRipple
    onPress={onclick}
    rippleColor="rgba(0, 0, 0, .22)"
  >
  <Card.Title
    title={item.foldername}
    subtitle={"Created At : " +data.convertTime(item.time)}
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    right={(props) => <IconButton {...props} icon="chevron-down" onPress={() => {setVisble(true)}} />}
    
  />
  </TouchableRipple>
   </Card>
      <BottomModal isVisible={isVisible} dismiss={()=>setVisble(false)} >
    <Text style={{ fontSize : 22 , padding : 16 , color: "#800080"}}>{item.foldername}</Text>
    <Text style={{ fontSize : 23 , padding : 16}}>Created On : {data.convertTime(item.time)}</Text>
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
    onPress={onRenameFolder}
    rippleColor="rgba(0, 0, 0, .22)"
  >
  <Card.Title
    title="Rename Folder"
    left={(props) => <Avatar.Icon {...props} icon="cloud-download" />}    
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



export default FolderCard