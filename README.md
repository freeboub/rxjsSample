# Sample rxjs react-native

This application demonstrates **memory leak** in **react native** environment while using **hermes** and **rxjs**.
The leak is reproduced on android (not tested in ios yet).

## Build & run
yarn install
yarn android

## Code

This sample is a dummy loop to fetch a web site (lemonde.com is just a sample) and subscribe to the answer

````JS
 ajax({
      url: 'http://youBigRestApiCall.com/',
      method: 'GET',
    }).subscribe(
      () => {},
    );
````

## Results
Each ajax call causes a memory leak.
As seen in sample when hermes is enable the memory is not released.
If you disable hermes by putting `hermesEnabled=false` in gradle.properties, the leak is no more seen.

## track memory leak

There are 2 ways to track memory usage in the app:
1/ The easy one: 
```sh 
while [ 1 ] ; do adb shell dumpsys meminfo com.rxjssample | grep PSS && sleep 2 ; done 
```

2/ Or use android studio memory profiler tool

