import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Alert } from 'react-native';
import { RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { fetchOrders } from '../api';
import Header from '../Header';
import OrderCard from '../OrderCard';
import { Order } from '../types';

export default function Ordes() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchData = () => {
    setIsLoading(true);
    fetchOrders()
    .then(response => setOrders(response.data))
    .catch(error => Alert.alert('Houve erro ao buscar os pedidos!'))
    .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused])

  const handleOnPress = (order: Order) => {
    navigation.navigate('OrderDetails', {
      order
    });
  }  

  return (
  <>
  
    <Header />
      <ScrollView style={styles.container}>
        {isLoading ? (
          <Text style={styles.loading}>Buscando pedidos...</Text>
        ) : (
          orders.map(order => (
            <TouchableWithoutFeedback 
                key={order.id} 
                onPress={() => handleOnPress(order)}
            >
              <OrderCard order={order} />
            </TouchableWithoutFeedback>
          ))
        )}
      </ScrollView>
      
  </>
  );
}

const styles = StyleSheet.create({
    container: {
      paddingRight: '5%',
      paddingLeft: '5%'
    },
    loading: {
      paddingTop: 15,
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: 19,
      letterSpacing: -0.24,
      color: '#DA5C5C',
      fontFamily: 'OpenSans_400Regular'
    }
  });
