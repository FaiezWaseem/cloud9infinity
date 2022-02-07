import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet , Text   , BackHandler} from 'react-native';
import Constants from 'expo-constants';
import { ActivityIndicator, Colors } from 'react-native-paper';
import database from "../Backend/Fire"

export default function UploadFile({navigation , ...props}) {
  const [ fileUrl , setFileUrl] = React.useState("");
  const [ isLoading , setisLoading] = React.useState(true);
  const [ isUploading , setisUploading] = React.useState(false);
   const { path }= props.route.params;
   const uploadFile =(url) =>{
          
         for(let i = 0 ; i < url.length ; i++){
           dbUpload(url[i]);
         }
         setisUploading(false)
         navigation.goBack();
  
   }
   const dbUpload = (url) =>{
         const key = database.getKey();
     const userid = database.getUid()
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      var fileid = url.replace("https://anonfiles.com/" , "");
       fileid = fileid.replace("/"+fileName , "");
       fetch(`https://api.anonfiles.com/v2/file/${fileid}/info`).then((res)=>res.text())
       .then((res)=>{
         const response = JSON.parse(res)
         const bytes = response.data.file.metadata.size.bytes;
         updateUsedStorage(bytes);
         console.log(response)
         setisUploading(true);
         if(path === "root"){
               database.fset("uploads/"+userid+"/"+key , {
           key : key , 
           isFile : true,
           filename : response.data.file.metadata.name,
           size : response.data.file.metadata.size.readable , 
           fileId : fileid,
           time : database.timeStamp(),
           uid : userid
         })
         }else{
           database.fset("uploads/"+userid +"/"+ path +"/"+key , {
           key : key , 
           isFile : true,
           filename : response.data.file.metadata.name,
           size : response.data.file.metadata.size.readable , 
           fileId : fileid,
           time : database.timeStamp(),
           uid : userid

         })
         }
       

       } )
   }
  const updateUsedStorage = (bytes) =>{
    database.once("user/"+database.getUid() , (snap)=>{
           database.update("user/"+database.getUid() , {
      used : snap.val().used + bytes
    })
  })

  } 
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
       "hardwareBackPress",
       backAction
     );
 
     return () => backHandler.remove();
   }, []);
 const backAction = () => {
    navigation.goBack();
   return true;
     };

  return (<>

    {   fileUrl != "" ?     <ActivityIndicator animating={true} color={Colors.red800} /> :  <WebView 
      onLoad={()=>  setTimeout(()=>{ setisLoading(false) } , 2000) }
      style={styles.container}
      source={{ uri: 'https://anonfiles.com/' }}
      injectedJavaScript={inject}
      onMessage={(event)=> {
        setFileUrl(JSON.parse(event.nativeEvent.data).link)
        uploadFile(JSON.parse(event.nativeEvent.data).link);
      }}
    />}
    </>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


const inject = `
 document.getElementById("upload-top").remove(); 
 document.getElementById("header-logo").remove();
 document.getElementById("footer").remove();
 document.getElementById("upload-description").innerText= ""
 document.getElementsByClassName("developer-notice")[0].innerHTML = ""
 const myInterval = setInterval(myTimer, 1200);

 function myTimer() {
   var uploaded = false;
   const x = document.getElementById("upload-preview");
   if(x.children.length === allUploadedFiles.length  &&  allUploadedFiles.length > 0 && x.children.length > 0){
         uploaded = true;
     }else{
        uploaded = false;
     }
 if(uploaded){
    var linkArray = [];
      for(let i = 0 ; i < document.getElementsByClassName("upload-file-input").length ; i++ ){
                 linkArray.push(document.getElementsByClassName("upload-file-input")[i].value)
}
    const obj = {
      link : linkArray
    }
  window.ReactNativeWebView.postMessage(JSON.stringify(obj))
  myStopFunction();
  }
 }

 function myStopFunction() {
  clearInterval(myInterval);
 }

   `
