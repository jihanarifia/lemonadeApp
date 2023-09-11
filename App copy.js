/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {ScrollView, StatusBar, Text, View, useColorScheme} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {AlanView} from '@alan-ai/alan-sdk-react-native';
import {NativeEventEmitter, NativeModules, SafeAreaView} from 'react-native';

function App() {
  // const {AlanManager, AlanEventEmitter} = NativeModules;
  // const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);
  // const subscription = alanEventEmitter.addListener('command', data => {
  //   console.log(`got command event ${JSON.stringify(data)}`);
  // });

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    const {AlanManager, AlanEventEmitter} = NativeModules;
    const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);
    const subscription = alanEventEmitter.addListener('command', data => {
      console.log(`got command event ${JSON.stringify(data)}`);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}></View>
      </ScrollView>
      <View>
        <AlanView
          projectid={
            '6981aac1c439beebba78b29f3941352b2e956eca572e1d8b807a3e2338fdd0dc'
          }
        />
      </View>
    </SafeAreaView>
  );
}
export default App;
