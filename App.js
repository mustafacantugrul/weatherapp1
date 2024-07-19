import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, Image, ImageBackground } from 'react-native';
import axios from 'axios';

const API_KEY = '0d3f2f9149574921b27200946241405'; 

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const translateCondition = (condition) => {
    switch (condition) {
      case 'Partly cloudy':
        return 'Parçalı bulutlu';
        case 'cloudy':
          return 'Bulutlu';
        case 'snowy':
          return 'Kar yağışlı';
        case 'rainy':
          return 'Yağmurlu';
        case 'clear':
          return 'Açık';
        case 'Sunny':
          return 'Güneşli';
        case 'Mist':
          return 'Sisli';
        case 'moderate rain':
          return 'Orta Şiddetli Yağmur';
        case 'light rain shower':
          return 'Hafif Yağmurlu';
        case 'overcast':
          return 'Kapalı ve Bulutlu';
      default:
        return condition;
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
      setWeather(response.data);
      setError('');
    } catch (error) {
      setError('Şehir bulunamadı. Lütfen geçerli bir şehir adı girin.');
      setWeather(null);
    }
  };

  return (
    <ImageBackground 
      source={require('./assets/background.jpg')} 
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Hava Durumunu Öğrenin!</Text>
        <TextInput
          style={styles.input}
          placeholder="Şehir adı giriniz.."
          value={city}
          onChangeText={setCity}
        />
        <Button title="Hava Durumunu Göster" onPress={fetchWeather} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        {weather && (
          <View style={styles.weatherContainer}>
            <Text style={styles.cityName}>{weather.location.name}</Text>
            <Text style={styles.temperature}>{weather.current.temp_c}°C</Text>
            <Image
              style={styles.icon}
              source={{ uri: `https:${weather.current.condition.icon}` }}
            />
            <Text style={styles.condition}>
              {translateCondition(weather.current.condition.text)}
            </Text>
          </View>
        )}
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{currentTime}</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 8,
    width: '80%',
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  weatherContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 24,
    color: '#333',
    marginBottom: 10,
  },
  icon: {
    width: 100,
    height: 100,
  },
  condition: {
    fontSize: 22,
    color: '#555',
    marginTop: 10,
  },
  timeContainer: {
    position: 'absolute',
    bottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  time: {
    fontSize: 18,
    color: '#333',
  },
});

export default App;
