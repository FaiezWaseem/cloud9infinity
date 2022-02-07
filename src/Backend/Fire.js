import firebase from 'firebase';
import { Alert } from 'react-native';
import config from "../../config";
class database {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }
    getUid(){
      // console.log(firebase.auth().currentUser)
      try{
        this.userid = firebase.auth().currentUser.uid
    return this.userid ;
      }catch(err){
        return null;
      }
  }
  //-------------------Authentication Logic --------------------------//
  isAuthenticated(callback){
    firebase.auth().onAuthStateChanged(callback);
   }
  signIn(email, pass) {
    const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
    promise.then((e) => {
      Alert.alert('Login', 'Login SuccessFull');
    });
    promise.catch((e) => {
      Alert.alert('Error', e.message);
    });
  }
  signOut() {
    firebase.auth().signOut();
  }
  signUp(email, pass, callback) {
     const promise = firebase.auth().createUserWithEmailAndPassword(email, pass)
      promise.then(function () {
        let userid = firebase.auth().currentUser.uid;
        callback(userid);
      })
      promise.catch(function (error) {
        callback(null)
        Alert.alert('Error', error);
      });
  }
  //-------------------Authentication Logic done --------------------------//

  fb(path) {
    return firebase.database().ref(path);
  }
  getKey() {
    return firebase.database().ref().child('video').push().key;
  }
  dob() { return firebase.database.ServerValue.increment(1);}
  update(path, callback) {
    firebase.database().ref(path).update(callback);
  }
  timeStamp (){
    return firebase.database.ServerValue.TIMESTAMP;
  }
  on(path, callback) {
    firebase.database().ref(path).on('child_added', callback);
  }
  once(path, callback) {
    firebase.database().ref(path).once('value', callback);
  }
  add(path, task) {
    firebase.database().ref(path).push(task);
  }
  fset(path, task) {
    firebase.database().ref(path).set(task);
  }
  dlt(path, id) {
    firebase.database().ref(path).child(id).remove();
  }
  off(path){
    firebase.database().ref(path).off()
  }
}
export default new database();
