import { useState, useEffect } from 'react';



export function Weather() {
  const [city] = useState("London");
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=51.5072&longitude=-0.1276&current_weather=true"
      );
      const data = await response.json();
      setTemperature(data.current_weather.temperature);
    } catch (error) {
      console.error("Failed to fetch weather:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", padding: "40px" }}>
      <h2>🌤️ Weather in {city}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <h3>🌡️ Temperature: {temperature}°C</h3>
      )}
    </div>
  );
};