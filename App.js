/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';

import {AlanView} from '@alan-ai/alan-sdk-react-native';

const App = () => {
  const {AlanManager, AlanEventEmitter} = NativeModules;
  const alanEventEmitter = new NativeEventEmitter(AlanEventEmitter);
  const [count, setCount] = useState(0);

  const incrementCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  // useEffect(() => {
  //   const subscription = alanEventEmitter.addListener('command', data => {
  //     console.log(`got command event ${JSON.stringify(data)}`);
  //   });
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  useEffect(() => {
    alanEventEmitter.addListener('onCommand', data => {
      if (data.command === 'setCounter') {
        incrementCount();
      }
    });
  }, [alanEventEmitter, incrementCount]);

  return (
    <View style={styles.container}>
      <Text>You clicked {count} times</Text>
      <Button onPress={incrementCount} title="Click me!" />
      <AlanView
        projectid={
          '6981aac1c439beebba78b29f3941352b2e956eca572e1d8b807a3e2338fdd0dc'
        }
      />
    </View>
  );
};

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
