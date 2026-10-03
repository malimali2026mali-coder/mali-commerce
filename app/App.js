import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([
        { id: 1, name: 'Smartphone Mali X Pro', price: 245000 },
        { id: 2, name: 'Montre Mali Fit', price: 98000 },
      ]));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mali Commerce</Text>
      <Text style={styles.subtitle}>Boutique mobile • Bamako</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price.toLocaleString('fr-FR')} FCFA</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff7f0',
    paddingTop: 60,
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
