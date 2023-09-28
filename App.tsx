import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store, AppStore } from './store/store'
import { useSelector, Provider } from 'react-redux'

import { AuthScreen, AuthLoadingScreen, HomeScreen } from './src/screens';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}


const App = () => {
  const Stack = createNativeStackNavigator();
  const { isLoggedIn } = useSelector((state: AppStore) => state.auth);

  const OnboardingNavigator = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
      </Stack.Navigator>
    )
  }

  const AppNavigator = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {isLoggedIn ? <AppNavigator /> : <OnboardingNavigator />}
      </NavigationContainer>
    </Provider>
  )

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator initialRouteName="AuthLoading">
  //       {/* <Stack.Screen name="LoadingAuthScreen" component={LoadingAuthScreen}/> */}
  //       {isSignedIn ? (
  //         <>
  //           {/* App Navigator */}
  //           <Stack.Screen name="Home" component={HomeScreen} />
  //           <Stack.Screen name="Movements" component={ActivityScreen} />
  //         </>
  //       ) : (
  //         <>
  //           {/* Onboarding Navigator */}
  //           <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
  //           <Stack.Screen name="Auth" component={AuthScreen} />
  //         </>
  //       )}
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}

export default AppWrapper;