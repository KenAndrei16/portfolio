/* ═══════════════════════════════════════════
   data.js — Mock Weather Data
   ─ Simulates API responses for different cities
   ─ In a real app, you'd replace this with
     fetch() calls to OpenWeatherMap API:
     https://api.openweathermap.org/data/2.5/weather
     ?q={city}&appid={API_KEY}&units=metric
════════════════════════════════════════════ */

const weatherData = {
  'baguio': {
    city:       'Baguio City',
    country:    'Philippines 🇵🇭',
    tempC:      18,
    humidity:   78,
    windSpeed:  12,
    uvIndex:    '3 Moderate',
    pressure:   1013,
    sunrise:    '5:48 AM',
    sunset:     '6:12 PM',
    condition:  'partly cloudy',
    icon:       '⛅',
    bgClass:    'bg-cloudy',
    forecast: [
      { day: 'Mon', icon: '🌤', high: 19, low: 14 },
      { day: 'Tue', icon: '🌧', high: 16, low: 13 },
      { day: 'Wed', icon: '⛈', high: 15, low: 12 },
      { day: 'Thu', icon: '🌥', high: 17, low: 13 },
      { day: 'Fri', icon: '☀️', high: 20, low: 14 },
    ],
  },

  'manila': {
    city:       'Manila',
    country:    'Philippines 🇵🇭',
    tempC:      32,
    humidity:   85,
    windSpeed:  18,
    uvIndex:    '8 Very High',
    pressure:   1008,
    sunrise:    '5:52 AM',
    sunset:     '6:09 PM',
    condition:  'hot and humid',
    icon:       '☀️',
    bgClass:    'bg-sunny',
    forecast: [
      { day: 'Mon', icon: '☀️', high: 33, low: 27 },
      { day: 'Tue', icon: '⛅', high: 31, low: 26 },
      { day: 'Wed', icon: '🌦', high: 30, low: 25 },
      { day: 'Thu', icon: '🌧', high: 28, low: 24 },
      { day: 'Fri', icon: '⛅', high: 31, low: 26 },
    ],
  },

  'cebu': {
    city:       'Cebu City',
    country:    'Philippines 🇵🇭',
    tempC:      30,
    humidity:   80,
    windSpeed:  14,
    uvIndex:    '7 High',
    pressure:   1010,
    sunrise:    '5:50 AM',
    sunset:     '6:08 PM',
    condition:  'sunny',
    icon:       '🌤',
    bgClass:    'bg-sunny',
    forecast: [
      { day: 'Mon', icon: '🌤', high: 31, low: 25 },
      { day: 'Tue', icon: '☀️', high: 32, low: 26 },
      { day: 'Wed', icon: '⛅', high: 30, low: 24 },
      { day: 'Thu', icon: '🌦', high: 29, low: 23 },
      { day: 'Fri', icon: '☀️', high: 31, low: 25 },
    ],
  },

  'davao': {
    city:       'Davao City',
    country:    'Philippines 🇵🇭',
    tempC:      28,
    humidity:   75,
    windSpeed:  10,
    uvIndex:    '6 High',
    pressure:   1011,
    sunrise:    '5:45 AM',
    sunset:     '6:00 PM',
    condition:  'partly cloudy',
    icon:       '⛅',
    bgClass:    'bg-cloudy',
    forecast: [
      { day: 'Mon', icon: '⛅', high: 29, low: 23 },
      { day: 'Tue', icon: '🌤', high: 30, low: 24 },
      { day: 'Wed', icon: '🌧', high: 27, low: 22 },
      { day: 'Thu', icon: '🌥', high: 28, low: 22 },
      { day: 'Fri', icon: '🌤', high: 29, low: 23 },
    ],
  },

  'tokyo': {
    city:       'Tokyo',
    country:    'Japan 🇯🇵',
    tempC:      22,
    humidity:   60,
    windSpeed:  20,
    uvIndex:    '4 Moderate',
    pressure:   1018,
    sunrise:    '5:10 AM',
    sunset:     '6:30 PM',
    condition:  'clear sky',
    icon:       '☀️',
    bgClass:    'bg-sunny',
    forecast: [
      { day: 'Mon', icon: '☀️', high: 23, low: 16 },
      { day: 'Tue', icon: '🌤', high: 22, low: 15 },
      { day: 'Wed', icon: '⛅', high: 20, low: 14 },
      { day: 'Thu', icon: '🌧', high: 18, low: 13 },
      { day: 'Fri', icon: '🌤', high: 21, low: 15 },
    ],
  },
};
