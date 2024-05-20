import { StyleSheet, View } from 'react-native';
import Router from './src/navigation/Router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/Context/AuthContext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <View style={styles.container}>
          <Router />
        </View>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
