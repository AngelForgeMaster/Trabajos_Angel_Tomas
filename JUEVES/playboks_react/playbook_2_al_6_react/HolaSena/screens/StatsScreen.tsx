import { useRef, useState } from 'react';
import { Animated, Button, StyleSheet, Text, View } from 'react-native';

const StatsScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(100)).current;

  const toggle = () => {
    const toValue = expanded ? 100 : 200;

    Animated.timing(animatedHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Estadísticas</Text>
      
      <Button title={expanded ? "Contraer Gráfica" : "Expandir Gráfica"} onPress={toggle} />
      
      <Animated.View
        style={[
          styles.box,
          { height: animatedHeight }
        ]}
      >
        <Text style={Text}>Contenido Animado</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  box: {
    width: '100%',
    backgroundColor: 'skyblue',
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default StatsScreen;