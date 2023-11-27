import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

const DataEntry = () => {
  const [abstractText, setAbstractText] = useState('');
  const [degreeOfInjury, setDegreeOfInjury] = useState('');
  const [partOfBody, setPartOfBody] = useState('');
  const [eventType, setEventType] = useState('');
  const [envFactor, setEnvFactor] = useState('');
  const [humanFactor, setHumanFactor] = useState('');
  const [message, setMessage] = useState('');

  const navigation = useNavigation();


  const handleSubmit = () => {
    const payload = {
      abstract_text: abstractText,
      degree_of_injury: degreeOfInjury,
      part_of_body: partOfBody,
      event_type: eventType,
      env_factor: envFactor,
      human_factor: humanFactor,
    };

    fetch(`${API_URL}/dataentry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            setMessage(jsonRes.message);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Enter the details here</Text>

      <Text style={styles.textFeature2}>Abstract Text</Text>
      <TextInput
        style={styles.input}
        value={abstractText}
        onChangeText={setAbstractText}
      />

      <Text style={styles.textFeature2}>Degree of Injury</Text>
      <TextInput
        style={styles.input}
        value={degreeOfInjury}
        onChangeText={setDegreeOfInjury}
      />

      <Text style={styles.textFeature2}>Part of Body</Text>
      <TextInput
        style={styles.input}
        value={partOfBody}
        onChangeText={setPartOfBody}
      />

      <Text style={styles.textFeature2}>Event Type</Text>
      <TextInput
        style={styles.input}
        value={eventType}
        onChangeText={setEventType}
      />

      <Text style={styles.textFeature2}>Environment Factor</Text>
      <TextInput
        style={styles.input}
        value={envFactor}
        onChangeText={setEnvFactor}
      />

      <Text style={styles.textFeature2}>Human Factor</Text>
      <TextInput
        style={styles.input}
        value={humanFactor}
        onChangeText={setHumanFactor}
      />

      <View style={styles.space} />

      <TouchableOpacity style={styles.allButtons} onPress={handleSubmit}>
        <Text style={styles.textFeature}>Submit</Text>
      </TouchableOpacity>

      {message ? (
        <Text style={styles.successMessage}>{message}</Text>
      ) : null}
      <View style={styles.space} />

      <TouchableOpacity style={styles.allButtons} onPress={() => navigation.navigate('StartPage')}>
        <Text style={styles.textFeature}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 16,
    color: 'black'
  },
  container: {
    padding: 16,
    backgroundColor: '#CBC3E3', // Set background color to whitish
  },
  input: {
    height: 40,
    borderColor: 'purple', // Set border color for text inputs
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 15, // Set border radius for text inputs
  },
  button: {
    marginBottom: 16,
  },
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
  space: {
    height: 15,
  },
  allButtons: {
    marginBottom: 16,
    borderRadius: 15, // Set border radius for buttons
    backgroundColor: '#8e44ad',
    height: 30,
    width: 380,
  },
  textFeature:{
    textAlign: 'center',
    fontSize: 18,
    color: '#FFE7FF',
  },
  textFeature2:{
    fontSize:15,
    color:'black',
  },
});


export default DataEntry;
