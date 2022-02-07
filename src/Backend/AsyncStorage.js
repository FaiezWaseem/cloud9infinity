import AsyncStorage from '@react-native-async-storage/async-storage'

//----save key value
const storeItem = async (key , value) => {
  try {
   await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
    console.log(e);
  }
  console.log("done.")
}
const storeObj = async (key,value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
    console.log("Error Object Async Storage "+e);
  }
}
//----Get key
async function getDataItem (key , callback) {
 await AsyncStorage.getItem(key).then(callback).catch((e)=>{
   console.log('Error Getting Item Value',e)
 })
}
const getObj = async (key , callback) => {
  try {
  await AsyncStorage.getItem(key).then(callback).catch((e)=>{
 })
  } catch(e) {
    // error reading value
  }
}

//--- remove key
const removeValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
  }

  console.log('Done.')
}

//---clearvall
const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    // clear error
  }
}

//---get all keys

const getAllKeys = async (callback) => {
  let keys = []
  try {
    await AsyncStorage.getAllKeys().then(callback)
  } catch(e) {
    // read key error
  }
}

function getAllData(callback){
     let keys = [];
 getAllKeys(function(key){
 keys = key
      for(let i = 0 ; i< keys.length ; i++){
        if(keys[i] != "SnackDeviceId"){
     getObj(keys[i],callback)
        }
    }
 })
}




export {storeItem , storeObj ,getDataItem  ,getObj , removeValue , clearAll ,getAllKeys , getAllData}


