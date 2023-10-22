// import React, { useState } from 'react';
// import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';

// const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

// const AuthScreen = () => {

//     const [email, setEmail] = useState('');
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     const [organisation_name, setOrganisationName]= useState('');
//     const [contact_number, setContactNumber]=useState('');

//     const [isError, setIsError] = useState(false);
//     const [message, setMessage] = useState('');
//     const [isLogin, setIsLogin] = useState(true);

//     const onChangeHandler = () => {
//         setIsLogin(!isLogin);
//         setMessage('');
//     };

//     const onLoggedIn = token => {
//         fetch(`${API_URL}/private`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`, 
//             },
//         })
//         .then(async res => { 
//             try {
//                 const jsonRes = await res.json();
//                 if (res.status === 200) {
//                     setMessage(jsonRes.message);
//                 }
//                 // const navigation= useNavigation();
//                 // navigation.navigate('StartPage');
//             } 

//             catch (err) {
//                 console.log(err);
//             };
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

//     const onSubmitHandler = () => {
//         const payload = {
//             email,
//             name,
//             password,
//             organisation_name,
//             contact_number
//         };
//         fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(payload),
//         })
//         .then(async res => { 
//             try {
//                 const jsonRes = await res.json();
//                 if (res.status !== 200) {
//                     setIsError(true);
//                     setMessage(jsonRes.message);
//                 } else {
//                     onLoggedIn(jsonRes.token);
//                     setIsError(false);
//                     setMessage(jsonRes.message);
//                 }
//             } 
//             catch (err) {
//                 console.log(err);
//             };
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     };

//     const getMessage = () => {
//         const status = isError ? `Error: ` : `Success: `;
//         return status + message;
//     }

//     const checkTextInput = () => {
//         //Check for the email TextInput and for other inputs as well
//         if (!email.trim()) {
//           alert('Email field cannot be empty');
//           return;
//         }
        
//         if(!email.includes("@")){
//             alert('Email should include @');
//             return;
//         }
//         if (!isLogin && !name.trim()) {
//           alert('Name field cannot be empty');
//           return;
//         }
        
//         if (!password.trim()) {
//             alert('Password field cannot be empty');
//             return;
//         }

//         if (!isLogin && !organisation_name.trim()) {
//             alert('Organisation Name field cannot be empty');
//             return;
//         }

//         if (!isLogin && !contact_number.trim()) {
//             alert('Contact Number field cannot be empty');
//             return;
//         }
//     }

//     return (
//         <ImageBackground source={require('../public/images/gradient-back.jpeg')} style={styles.image}>

//             {/* Top Heading */}
//             <View style={styles.title}>
//             <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Create a new account'}</Text>
//             </View>

//             <View style={styles.card}>
//                 <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>

//                 <View style={styles.form}>
//                     <View style={styles.inputs}>

//                         <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
//                         {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={setName}></TextInput>}
//                         {!isLogin && <TextInput style={styles.input} placeholder="Organisation Name" autoCapitalize="none" onChangeText={setOrganisationName}></TextInput>}
//                         {!isLogin &&  <TextInput style={styles.input} placeholder="Contact Number" autoCapitalize="none" onChangeText={setContactNumber}></TextInput>}
                       
//                         <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>

//                         <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>

//                         {/* <TouchableOpacity style={styles.button} onPress={()=>{checkTextInput(); onSubmitHandler();}}> */}
//                         <TouchableOpacity style={styles.button} onPress={()=>{checkTextInput(); onLoggedIn();}}>
//                             <Text style={styles.buttonText}>Submit</Text>
//                         </TouchableOpacity>
                        
//                         <Text style={styles.textAboveBtn}>{isLogin ? "Don't have an account? " : "Already have an account? "}</Text>
//                         <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
//                             <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
//                         </TouchableOpacity>

//                     </View>    
//                 </View>
//             </View>
//         </ImageBackground>
//     );
// };

// const styles = StyleSheet.create({
//     title:{
//             color: 'black', 
//             fontSize: 24, 
//             fontWeight: 'bold',
//             marginTop: '10%',
//             fontStyle: 'italic'
//     },
//     image: {
//         flex: 1,
//         width: '100%',
//         alignItems: 'center',
//     },  
//     card: {
//         flex: 1,
//         backgroundColor: 'rgba(255, 255, 255, 0.4)',
//         width: '80%',
//         marginTop: '8%',
//         borderRadius: 20,
//         maxHeight: 500,
//         paddingBottom: '30%',
//     },
//     heading: {
//         fontSize: 30,
//         fontWeight: 'bold',
//         marginLeft: '10%',
//         marginTop: '5%',
//         marginBottom: '30%',
//         color: 'black',
//         alignContent: 'center'
//     },
//     form: {
//         flex: 1,
//         justifyContent: 'space-between',
//         paddingBottom: '5%',
//     },
//     inputs: {
//         width: '100%',
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingTop: '10%',
//     },  
//     input: {
//         width: '80%',
//         borderBottomWidth: 1,
//         borderBottomColor: 'black',
//         paddingTop: 10,
//         fontSize: 16, 
//         minHeight: 40,
//     },
//     button: {
//         width: '80%',
//         backgroundColor: 'black',
//         height: 40,
//         borderRadius: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginVertical: 8,
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: '400'
//     },
//     buttonAlt: {
//         width: '80%',
//         borderWidth: 1,
//         height: 40,
//         borderRadius: 50,
//         borderColor: 'black',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginVertical: 5,
//     },
//     buttonAltText: {
//         color: 'black',
//         fontSize: 16,
//         fontWeight: '400',
//     },
//     message: {
//         fontSize: 16,
//         marginVertical: '5%',
//     },
//     textAboveBtn:{
//         fontSize: 15,
//         fontWeight: 'bold',
//     }
// });

// export default AuthScreen;

import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

const AuthScreen = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [organisation_name, setOrganisationName]= useState('');
    const [contact_number, setContactNumber]=useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const onLoggedIn = token => {
        fetch(`${API_URL}/private`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const onSubmitHandler = () => {
        const payload = {
            email,
            name,
            password,
            organisation_name,
            contact_number,
        };
        fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    onLoggedIn(jsonRes.token);
                    setIsError(false);
                    setMessage(jsonRes.message);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    return (
        <ImageBackground source={require('../public/images/gradient-back.jpeg')} style={styles.image}>
            <View style={styles.card}>
                <Text style={styles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                        {!isLogin && <TextInput style={styles.input} placeholder="Name" onChangeText={setName}></TextInput>}

                        {!isLogin && <TextInput style={styles.input} placeholder="Organisation Name" autoCapitalize="none" onChangeText={setOrganisationName}></TextInput>}
                        {!isLogin &&  <TextInput style={styles.input} placeholder="Contact Number" autoCapitalize="none" onChangeText={setContactNumber}></TextInput>}

                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                        <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>

                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Done</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonAlt} onPress={onChangeHandler}>
                            <Text style={styles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                        </TouchableOpacity>

                    </View>    
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },  
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '80%',
        marginTop: '40%',
        borderRadius: 20,
        maxHeight: 480,
        paddingBottom: '30%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },  
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
});

export default AuthScreen;