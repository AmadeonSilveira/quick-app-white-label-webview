import React, { useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, View } from 'react-native';
import { WebView } from 'react-native-webview';
import clientConfig from './client-config.json'; //arquivo gerado no build com as infos de cada cliente

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: clientConfig.cor1 }}>
      <SafeAreaView style={{ backgroundColor: clientConfig.cor1 }} />
      <StatusBar barStyle="light-content" backgroundColor={clientConfig.cor1} />

      <WebView
        source={{ uri: clientConfig.webviewUrl }}
        originWhitelist={['*']}
        startInLoadingState={true}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={{ width: "100%", height: "100%", backgroundColor: clientConfig.cor2 }}
      />

      {loading && (
        <ActivityIndicator
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: clientConfig.cor1
          }}
          color="#fff"
        />
      )}
    </View>

  );
}
