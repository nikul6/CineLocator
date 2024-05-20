import React, { useContext, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useForm } from 'react-hook-form';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthContext } from '../Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">

export default function Home({navigation}: LoginScreenProps) {
  const { height } = useWindowDimensions();
  const [loading, setLoading] = useState<boolean>(false);
  const { setIsAuthenticated } = useContext(AuthContext);

  const dummyUser = {
    username: 'alex',
    password: 'alex123',
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSignInPressed = async (data: LoginData) => {
    setLoading(true);
    try {
      if (data.username === dummyUser.username && data.password === dummyUser.password) {
        await AsyncStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        navigation.navigate('TheatreMap');
        console.log("scucess")
      } else {
        Alert.alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onForgotPasswordPressed = () => {
    console.log('onForgotPasswordPressed');
  };

  const onSignUpPress = () => {
    console.log('onSignUpPress')
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={require('../assets/Logo.png')}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{ required: 'Username is required' }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password should be minimum 6 characters long',
            },
          }}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#F41111" />
        ) : (
          <CustomButton
            text={'Sign In'}
            onPress={handleSubmit(onSignInPressed)}
          />
        )}

        <CustomButton
          text={"Forgot password?"}
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <SocialSignInButtons />

        <CustomButton
          text={"Don't have an account? Create one"}
          onPress={onSignUpPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
})