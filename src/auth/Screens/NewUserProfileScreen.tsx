import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from 'react-native-check-box'
import OrangeButton from '../../ui/OrangeButton';

export default function NewUserProfileScreen(){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  return (
    <View style={styles.container}>
        <View>
      <Text style={styles.title}>REGISTER</Text>
      <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Enter your details</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Icon name="person-outline" size={20} style={styles.icon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <Icon name="person-outline" size={20} style={styles.icon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="+91"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <Icon name="checkmark-circle" size={20} style={styles.icon} color="green" />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Icon name="mail-outline" size={20} style={styles.icon} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Icon name="eye-off-outline" size={20} style={styles.icon} />
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          isChecked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
          checkedCheckBoxColor="green"
        />
        <Text style={styles.checkboxText}>
          By continuing, I confirm I have read the
          <Text style={styles.link}> Terms and conditions </Text>
          and
          <Text style={styles.link}> Privacy Policy</Text>
        </Text>
      </View>
      </View>
    <View>

      <OrangeButton text='Next' onPress={()=>{}} iconName={''} />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingVertical : 40,
    backgroundColor: '#fff',
    justifyContent : 'space-between'
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontWeight : 'bold',
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 20,
    marginLeft : 5
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 14,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
});


