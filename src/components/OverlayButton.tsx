import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface OverlayButtonProps {
    onPress: () => void;
    text: string;
}

export default function OverlayButton({text, onPress}: OverlayButtonProps) {
    return (
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={onPress}>
            <Text style={{ fontSize: 16, color: '#fff', fontWeight: '500' }}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 20,
        right: 10,
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