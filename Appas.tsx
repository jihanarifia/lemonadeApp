/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {ScrollView, StatusBar, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AlanView} from '@alan-ai/alan-sdk-react-native';
import {NativeEventEmitter, NativeModules, SafeAreaView} from 'react-native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    // Anything in here is fired on component mount.

    const {AlanManager, AlanEventEmitter} = NativeModules;
    const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);
    const subscription = alanEventEmitter.addListener('command', data => {
      console.log(`got command event ${JSON.stringify(data)}`);
    });
    return () => {
      // Anything in here is fired on component unmount.\

      subscription.remove();
    };
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // return (
  //   <SafeAreaView>
  //     <StatusBar
  //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  //       backgroundColor={backgroundStyle.backgroundColor}
  //     />
  //     <ScrollView contentInsetAdjustmentBehavior="automatic">
  //       <Text style={{fontSize: 24}}>New</Text>
  //     </ScrollView>
  //   </SafeAreaView>
  // );
  return (
    <AlanView
      projectid={
        'cc2b0aa23e5f90d2974f1bf6b6929c1b2e956eca572e1d8b807a3e2338fdd0dc/prod'
      }
    />
  );
}
export default App;
