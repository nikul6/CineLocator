import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface BackButtonProps {
    onPress: () => void;
}

export default function BackButton({ onPress }: BackButtonProps) {
    return (
        <TouchableOpacity style={styles.backButton} onPress={onPress}>
            <Image source={require('../assets/back.png')} style={styles.backButtonImage} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 30,
    },
    backButtonImage: {
        width: 30,
        height: 30,
        tintColor: '#fff',
    },
})