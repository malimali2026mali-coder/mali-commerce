import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const products = [
  { id: '1', name: 'Smartphone Mali X Pro', price: '245 000 FCFA' },
  { id: '2', name: 'Montre connectée Mali Fit', price: '98 000 FCFA' },
  { id: '3', name: 'Sac à dos voyage', price: '54 000 FCFA' },
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mali Commerce</Text>
      <Text style={styles.subtitle}>Boutique mobile • Bamako</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f0',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 20,
    color: '#6b7280',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  price: {
    marginTop: 6,
    color: '#ff7a00',
    fontWeight: '700',
  },
});
