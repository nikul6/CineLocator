import React from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BackButton from '../components/BackButton';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, "TheatreDetails">

const TheatreDetails = ({ route, navigation }: DetailsScreenProps) => {
    const { id, theatreName, theatreAddress, numberOfStars, rating, image, showtimes } = route.params.theatres;

    const renderShowtimes = ({ item }: any) => (
        <View style={styles.showtimeItem}>
            <Text style={styles.showtimeMovie}>{item.movie}</Text>
            <View>
                {item.timings.map((timing: Timings, index: number) => (
                    <View key={index} style={styles.timingItem}>
                        <Text style={styles.timing}>{timing.time} </Text>
                        <Text> - </Text>
                        <Text style={styles.timingPrice}>₹{timing.price}</Text>
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <BackButton onPress={() => navigation.goBack()} />
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.theatreName}>{theatreName}</Text>
                <Text style={styles.theatreAddress}>{theatreAddress}</Text>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{numberOfStars} ★</Text>
                    <Text style={styles.rating}>{rating} Ratings</Text>
                </View>
                <Text style={styles.showtimesTitle}>Showtimes Today:</Text>
                <FlatList
                    data={showtimes}
                    renderItem={renderShowtimes}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.showtimesList}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 15,
    },
    theatreName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#000'
    },
    theatreAddress: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    rating: {
        fontSize: 16,
        marginRight: 12,
        color: '#888',
    },
    showtimesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#000'
    },
    showtimeItem: {
        marginBottom: 20,
    },
    showtimeMovie: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#000'
    },
    timingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    timing: {
        color:'#fff', 
        padding:5, 
        backgroundColor:'#000'
    },
    timingPrice: {
        color: '#fff',
        padding:5, 
        backgroundColor:'#000'
    },
    showtimesList: {
        paddingBottom: 20,
    },
});

export default TheatreDetails;
