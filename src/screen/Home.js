import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import AlbumsTab from "../component/AlbumsTab";
import Profile from "../component/Profile"
import { Dirs, FileSystem } from 'react-native-file-access';

const Home = ({navigation , ...props}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'albums', title: 'Albums', icon: 'folder-image' , navigation : navigation },
    { key: 'recents', title: 'Profile', icon: 'account' , navigation : navigation },
  ]);
   React.useEffect(()=>{
       createDirectory(Dirs.SDCardDir+"/Download/cloud9infinity")
       createDirectory(Dirs.SDCardDir+"/Download/cloud9infinity/Media")
       createDirectory(Dirs.SDCardDir+"/Download/cloud9infinity/Document");
   } ,[])

 const createDirectory = (path) =>{
  FileSystem.exists(path).then((res) =>{
    if(!res){
     FileSystem.mkdir(path).then((res)=>{
       console.log(res)
     })
    }else{
      console.log("Directory Exists")
    }
   });
 }

  const renderScene = BottomNavigation.SceneMap({
    albums: AlbumsTab,
    recents: Profile,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
export default Home;