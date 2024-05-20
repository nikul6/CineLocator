import React, { useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import theatre from '../data/theatre.json';
import TheatreList from '../components/TheatreList';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import OverlayButton from '../components/OverlayButton';
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type MapScreenProps = NativeStackScreenProps<RootStackParamList, "TheatreMap">

const MapScreen = ({ navigation }: MapScreenProps) => {
    const [selectedTheatre, setSelectedTheatre] = useState(null);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => [80, '50%', '90%'], [])

    const handleMarkerPress = (marker: any) => {
        setSelectedTheatre(marker);
    };

    return (
        <View style={styles.container}>
            <OverlayButton text={'Show Top IMBD Movies'} onPress={() => navigation.navigate('MoviesScreen')} />
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 19.0760,
                    longitude: 72.8777,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider={Platform.OS === 'ios' ? undefined:  PROVIDER_GOOGLE}
                minZoomLevel={5}
                maxZoomLevel={12}
            >
                {theatre.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        title={marker.theatreName}
                        onPress={() => handleMarkerPress(marker)}
                    />
                ))}
            </MapView>

            {selectedTheatre &&
                <TheatreList theatre={selectedTheatre} containerStyle={{
                    position: 'absolute',
                    bottom: typeof snapPoints[0] === 'number' ? snapPoints[0] + 10 : 100,
                    left: 10,
                    right: 10,
                }} />
            }

            <BottomSheet
                index={0}
                snapPoints={snapPoints}
                ref={bottomSheetRef}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.totalTheatre}>Over {theatre.length} theatre</Text>
                    <BottomSheetFlatList
                        data={theatre}
                        contentContainerStyle={{ gap: 10, padding: 10 }}
                        renderItem={({ item }) => <TheatreList theatre={item} />}
                    />
                </View>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    callout: {
        padding: 10,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
    },
    totalTheatre: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: 'bold',
        color:'#000'
    },
    popupContainer: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 70,
        left: 10,
        right: 10,
        borderRadius: 10
    },
});

export default MapScreen;