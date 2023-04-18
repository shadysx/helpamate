import { AuthContext } from '../context/AuthContext';
import { View, ActivityIndicator } from 'react-native'
import { useContext, useEffect } from 'react';
import UnAuthStack from './unAuthStack';
import AuthStack, { Main } from './mainStack';

const RootNavigation = () => {

  const {isLoading, userToken} = useContext(AuthContext)

  if(isLoading){
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size={'large'}/>
      </View>
    )
  } 
  return (

      <View style={{flex:1}}>
        {userToken != null ? <Main/> : <UnAuthStack/>}
      </View>
  
  )
}

export default RootNavigation;

