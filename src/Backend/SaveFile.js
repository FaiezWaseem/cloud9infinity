import base64 from 'react-native-base64'
import * as FileSystem from 'expo-file-system';
import {Share} from "react-native"
export const save = async (path , data) =>{
    FileSystem.writeAsStringAsync(path, data, {encoding: FileSystem.EncodingType.UTF8})
}
export const loadFile = async (path , callback) => {
    let file = await FileSystem.readAsStringAsync(path, { encoding: FileSystem.EncodingType.Base64 })
    .then((res) => callback(base64.decode(res)))
    .catch(error =>{callback(error)});
}
export async function createDir(dir) {
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    console.log(" directory doesn't exist, creating...");
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
}
export function getAllFilesIn(dir , callback){
   FileSystem.readDirectoryAsync(dir).then(file => {
           callback(file);
      })
}
export function getFileInfo(path , callback){
      FileSystem.getInfoAsync(path).then(file => {
        callback(file);
      })
}
export function deleteFrom(path){
  FileSystem.deleteAsync(path);
}
export function decUrl(url , callback){
   fetch("https://v-point.000webhostapp.com/test/AnonFileUpload/api/anonDirectDownloadLink.php?link="+url)
    .then(data=>{ return data.json()})
   .then(data=>{
   callback(data.data);
   })   

}
 const share = async (msg) => {
    try {
      const result = await Share.share({
        message:  msg ,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
export {share};
