import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity, Linking, Alert } from 'react-native';
import BackButton from '../components/BackButton';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import OverlayButton from '../components/OverlayButton';
import { AuthContext } from '../Context/AuthContext';
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

type MoviesScreenProps = NativeStackScreenProps<RootStackParamList, "MoviesScreen">;

const MoviesScreen = ({ navigation }: MoviesScreenProps) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const { handleLogout } = useContext(AuthContext);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('https://dummyapi.online/api/movies');
                if (!response.ok) {
                    Alert.alert('Failed to fetch movies');
                }
                const data = await response.json();
                setMovies(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#F41111" />
            </View>
        );
    }

    const renderItem = ({ item }: { item: Movie }) => (
        <TouchableOpacity style={styles.movieCard} onPress={() => Linking.openURL(item.imdb_url)} activeOpacity={0.7}>
            <Image source={require('../assets/production.png')} style={styles.poster} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.movie}</Text>
                <Text style={styles.rating}>Rating: {item.rating}</Text>
            </View>
        </TouchableOpacity>
    );

    const clearAsyncStorage = async () => {
        handleLogout();
    };

    return (
        <View style={[styles.safeArea, {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        }]}>
            <BackButton onPress={() => navigation.goBack()} />
            <Image source={require('../assets/Logo.png')} style={styles.logo} />
            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
            <OverlayButton text={'Logout'} onPress={clearAsyncStorage} />
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '100%',
        height: '20%',
        resizeMode: 'contain',
        marginVertical: 10,
    },
    listContent: {
        padding: 10,
    },
    row: {
        justifyContent: 'space-between',
    },
    movieCard: {
        backgroundColor: '#2c2c2c',
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        width: '48%',
        height: 160,
    },
    poster: {
        width: '100%',
        resizeMode: 'contain',
        marginVertical: 10
    },
    infoContainer: {
        padding: 10,
        backgroundColor: '#3c3c3c',
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    rating: {
        fontSize: 14,
        color: '#d3d3d3',
    }
});

export default MoviesScreen;
