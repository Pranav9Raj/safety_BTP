import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import DataEntry from './DataEntry';
import { ScrollView } from 'react-native';
import AuthScreen from './AuthScreen';
import { schemeCategory10 } from 'd3-scale-chromatic';


const API_URL = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

const StartPage = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [showChart, setShowChart] = useState(false);


    const navigation = useNavigation();

    const options1 = [
        'degree_of_injury',
        'part_of_body',
        'event_type',
        'env_factor',
        'human_factor',
    ];


    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const selectOption = (option) => {
        setSelectedOption(option);
        setDropdownVisible(false);

        // Fetch data from your backend when an option is selected
        // Update chartData state with the fetched data
        fetchData(option);
        setShowChart(true);
    };

    const fetchData = async (selectedColumn) => {
        try {
            const url = `${API_URL}/newgraphData?column=${selectedColumn}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            console.log(data);

            setChartData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    const colorScale = schemeCategory10.slice(0, chartData.length);

    chartData.forEach((dataPoint, index) => {
        dataPoint.color = colorScale[index];
    });

    const closeModal = () => {
        setShowChart(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/profile.png')} style={styles.logo1} />
                <Text style={styles.welcomeText}>Hi, Welcome back!</Text>
            </View>
            <View>
                <Text style={[styles.title, styles.row]}>Safety Data Dashboard</Text>
            </View>
            <View style={styles.row}>
                <Image source={require('../assets/safety.jpg')} style={[styles.logo2, styles.row]} />
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.allButtons} onPress={() => { }}>
                    <Text style={styles.buttonText}>Highlights</Text>
                </TouchableOpacity>
                <View style={styles.space} />
                <TouchableOpacity style={styles.allButtons} onPress={() => { }}>
                    <Text style={styles.buttonText}>Near Misses</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={styles.allButtons} onPress={() => { }}>
                    <Text style={styles.buttonText}>Accidents</Text>
                </TouchableOpacity>
                <View style={styles.space} />
                <TouchableOpacity style={styles.allButtons} onPress={() => { }}>
                    <Text style={styles.buttonText}>First Aid</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.row}>
                <TouchableOpacity style={styles.allButtons} onPress={() => { }}>
                    <Text style={styles.buttonText}>Departmental</Text>
                </TouchableOpacity>
                <View style={styles.space} />
                <TouchableOpacity style={styles.allButtons} onPress={toggleDropdown}>
                    <Text style={styles.buttonText}>Graphs</Text>
                </TouchableOpacity>
            </View>
            {showChart ? (
                <Modal
                    transparent={true}
                    visible={showChart}
                    animationType="slide"
                    onRequestClose={closeModal}
                >
                    <TouchableWithoutFeedback onPress={closeModal}>
                        <View style={styles.modalContainer}>
                            <View style={[styles.chartContainer, styles.chartPopup]}>
                                <PieChart
                                    data={chartData}
                                    width={300}
                                    height={200}
                                    chartConfig={{
                                        backgroundGradientFrom: '#1E2923',
                                        backgroundGradientTo: '#08130D',
                                        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                                    }}
                                    accessor="count"
                                    backgroundColor="transparent"
                                    paddingLeft="15"
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            ) : null}
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.allButtons} onPress={() => navigation.navigate(DataEntry)}>
                    <Text style={styles.buttonText2}>Add new data</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.secondButtons} onPress={() => navigation.navigate(AuthScreen)}>
                    <Text style={styles.buttonText2}>Log Out</Text>
                </TouchableOpacity>
            </View>
            <Modal
                transparent={true}
                visible={isDropdownVisible}
                animationType="slide"
                onRequestClose={() => setDropdownVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options1}
                            keyExtractor={(item) => item}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.dropdownOption,
                                        { backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white' },
                                    ]}
                                    onPress={() => selectOption(item)}
                                >
                                    <Text style={styles.dropdownOptionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8e44ad', // purple background
        padding: 20, // Add padding to the container
    },
    title: {
        fontSize: 24,
        color: 'black',
    },
    row: {
        flexDirection: 'row',
        // justifyContent: 'flex-start', Change this line to shift buttons to the left
        justifyContent: 'space-evenly',
        marginBottom: 10,
    },
    space: {
        width: 50,
    },
    allButtons: {
        backgroundColor: '#CBC3E3', // purple background color
        borderRadius: 10, // Border radius for rounded corners
        padding: 8, // Padding for the button
        width: 130,
        height: 50,
        textAlign: 'center', // Align text in the center
        justifyContent: 'center', // Align text vertically in the center
    },
    secondButtons: {
        backgroundColor: '#CBC3E3', // purple background color
        borderRadius: 12, // Border radius for rounded corners
        // padding: 10, // Padding for the button
        width: 290,
        height: 40,
        textAlign: 'center', // Align text in the center
        justifyContent: 'center', // Align text vertically in the center
        marginBottom: 10,
    },
    buttonText: {
        color: 'black', // Text color for buttons
        textAlign: 'center', // Align text in the center
        fontSize: 15,
    },
    buttonText2: {
        color: 'black', // Text color for buttons
        textAlign: 'center', // Align text in the center
        fontSize: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc', // Border color
        width: 200,
    },
    dropdownOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownOptionText: {
        fontSize: 15,
        color: '#8e44ad',
    },
    logo1: {
        width: 50,
        height: 50,
        borderRadius: 100,
        alignSelf: 'flex-start',
    },
    logo2: {
        width: 210,
        height: 210,
        borderRadius: 100,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically in the center
        alignSelf: 'flex-start',
        marginLeft: 4, // Add some margin for spacing
    },
    welcomeText: {
        marginLeft: 10, // Add some margin between the image and text
        fontSize: 16, // Adjust font size as needed
    },
    chartContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // White background with 90% opacity
      },
    
      chartPopup: {
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc', // Border color
        width: 300,
        marginTop: 50, // Adjust the top margin as needed
      },
});

export default StartPage;