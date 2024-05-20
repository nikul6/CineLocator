import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type TheatreListProps = {
    theatre: Theatre;
    containerStyle?: ViewStyle
}

export default function TheatreList({ theatre, containerStyle }: TheatreListProps) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <TouchableOpacity style={[containerStyle, styles.card]} onPress={() => navigation.navigate('TheatreDetails', { theatres: theatre })}>
            <Image source={{ uri: theatre.image }} style={styles.img} />
            <View style={styles.container}>
                <Text style={styles.name}>{theatre.theatreName}</Text>
                <Text style={styles.address}>{theatre.theatreAddress}</Text>
                <Text>★ {theatre.numberOfStars}({theatre.rating})</Text>
                <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold', color: '#000' }}>Currently Playing Movies</Text>
                {theatre.showtimes.map((data, index) =>
                    <View key={index} style={styles.shoetimeConatiner}>
                        <Text style={{ color: '#fff' }}>• {data.movie}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden'
    },
    img: {
        width: 160,
        height: '100%'
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
    address: {
        fontSize: 12,
        marginBottom: 5,
        color: 'gray'
    },
    container: {
        padding: 10,
        flex: 1,
        // backgroundColor:'green'
    },
    shoetimeConatiner: {
        backgroundColor: 'indigo',
        padding: 5,
        borderRadius: 5,
        margin: 1, overflow: 'hidden'
    }
})