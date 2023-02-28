/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {ajax} from 'rxjs/ajax';

function Elt(): JSX.Element {
  const [loopIdx, setLoopIdx] = useState(0);

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
        gc();
      },
      error: _error => {
        setLoopIdx(loopIdx + 1);
        console.log('error', _error);
      },
    });
  }, [loopIdx]);

  useEffect(() => {
    test();
  }, [test]);

  return <></>;
}

function App(): JSX.Element {
  const [showElt, setShowElt] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowElt(false);
    }, 60000);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.darker,
      }}>
      {showElt ? <Elt /> : null}

      <Text style={{color: 'white'}}>Hello world</Text>
    </SafeAreaView>
  );
}

export default App;
