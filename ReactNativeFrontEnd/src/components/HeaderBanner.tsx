import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HeaderBanner = ({ onPressAddWish }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.brandName}>HelpMate</Text>
      <TouchableOpacity style={styles.button} onPress={onPressAddWish}>
        <MaterialIcons name="add-circle" size={28} color="#1E88E5" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  brandName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HeaderBanner
