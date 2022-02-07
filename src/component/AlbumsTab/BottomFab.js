import * as React from 'react';
import { Avatar, Card, IconButton , TouchableRipple , Title  , Paragraph , Button ,  FAB, Portal, Provider  ,  Dialog } from 'react-native-paper';
import { View  , ScrollView , Text  } from "react-native";
import {Input} from "../../screen/Auth"
import database from "../../Backend/Fire"

const BottomFab = ({navigation , path}) =>{
      const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });
    const hideDialog = () => setVisible(false);
    const [visible, setVisible] = React.useState(false);
  const { open } = state;

 const folderCreate=(value)=>{
   const uid = database.getUid();
   const key = database.getKey();
     if(path === "root"){
        database.fset("uploads/"+uid + "/"+key , {
    uid : uid , 
    isFile : false , 
    time : database.timeStamp(),
    key : key , 
    foldername : value
  })
     }else{
        database.fset("uploads/"+uid +"/"+ path + "/"+key , {
    uid : uid , 
    isFile : false , 
    time : database.timeStamp(),
    key : key , 
    foldername : value
  })
     }
  hideDialog();
 }


  return (
          <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={'plus'}
          actions={[
            { icon: 'plus',
             label: 'Upload File',
             onPress: () => navigation.navigate('UploadFile' , {
               path : path
             }) },
            {
              icon: 'folder',
              label: 'Create new Folder',
              onPress: () =>setVisible(true),
              small: true,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
      <ModalBox state={visible} hideDialog={hideDialog}  callback={(value)=>folderCreate(value)} />
    </Provider>
    
  )
}

const ModalBox = ({ state , hideDialog , callback}) =>{

  const [value , setValue] = React.useState();
 const  onclick = () =>{
   callback(value)
 }


  return (
        <Portal>
      <Dialog visible={state} onDismiss={hideDialog} style={{ padding : 20}}>
      <Dialog.Actions>
      <Input   placeholder="Enter Folder Name"  onChange={(value)=> {
          setValue(value)
          }}  />
      </Dialog.Actions>
        <Dialog.Actions>
          <Button onPress={() => hideDialog()}>Cancel</Button>
          <Button onPress={onclick}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export {ModalBox};
export default BottomFab;