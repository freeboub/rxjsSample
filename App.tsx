/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {ajax} from 'rxjs/ajax';

function App(): JSX.Element {
  const [loopStarted, setLoopStarted] = useState(true);
  const [loopIdx, setLoopIdx] = useState(0);

  useEffect(() => {
    setInterval(() => {
      console.log('calling gc');
      // FIXME should play with this timing
      // gc();
    }, 60000);
  }, []);

  const test = useCallback(() => {
    console.log('call ajax loop', loopIdx);
    return ajax({
      url: 'https://youtube.com',
      //url: 'https://slashdot.com',
      method: 'GET',
    }).subscribe({
      next: () => {
        console.log('result');
        setLoopIdx(loopIdx + 1);
        // too much agressive
        // gc();
      },
      error: _error => {
        setLoopIdx(loopIdx + 1);
        console.log('error', _error);
      },
    });
  }, [loopIdx]);

  useEffect(() => {
    if (loopStarted) {
      // adding timeout doesn't help
      //setTimeout(() => {
      test();
      //}, 1);
    }
  }, [test, loopStarted, loopIdx]);

  const testStyle = {color: 'white'};
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.darker,
      }}>
      <Text style={testStyle}>Hello world</Text>
      <TouchableOpacity
        onPress={() => {
          gc();
        }}>
        <Text style={testStyle}>LAUNCH GC</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setLoopStarted(false);
        }}>
        <Text style={testStyle}>STOP LOOP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setLoopStarted(true);
        }}>
        <Text style={testStyle}>START LOOP</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default App;
