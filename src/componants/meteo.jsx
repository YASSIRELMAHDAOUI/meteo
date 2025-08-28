import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Grp206WeatherApp() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const toDateFunction = () => {
    const months = [
      "Janvier","Février","Mars","Avril","Mai","Juin",
      "Juillet","Août","Septembre","Octobre","Novembre","Décembre",
    ];
    const WeekDays = [
      "Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi",
    ];
    const currentDate = new Date();
    return `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  };

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setWeather({ ...weather, loading: true });
      const api_key = "f00c38e0279b7bc85480c3fe775d518c";

      try {
        const res = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          { params: { q: input, units: "metric", appid: api_key } }
        );
        setWeather({ data: res.data, loading: false, error: false });
        setInput("");
      } catch (error) {
        setWeather({ ...weather, data: {}, loading: false, error: true });
        setInput("");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <motion.h1
        className="text-5xl font-extrabold mb-8 tracking-wide text-blue-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        GRP206 Weather
      </motion.h1>

      <motion.div
        className="bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl w-full max-w-lg border border-gray-700"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <input
          type="text"
          className="w-full p-4 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          placeholder="Entrez une ville..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={search}
        />

        {weather.loading && (
          <div className="flex justify-center mt-6">
            {/* Loader CSS simple */}
            <motion.div
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </div>
        )}

        {weather.error && (
          <motion.p
            className="text-red-400 text-center mt-6 flex items-center justify-center gap-3 text-lg font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FontAwesomeIcon
              icon={faFaceSadTear}
              className="text-3xl text-yellow-400 animate-bounce"
            />
            Ville introuvable
          </motion.p>
        )}

        {weather.data.main && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold text-blue-400">
              {weather.data.name}, {weather.data.sys.country}
            </h2>
            <p className="text-lg mt-2 text-gray-300">{toDateFunction()}</p>
            <img
              className="mx-auto drop-shadow-md"
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            <p className="text-5xl font-extrabold mt-2 text-white">
              {Math.round(weather.data.main.temp)}°C
            </p>
            <p className="text-lg mt-3 text-gray-400">
              🌬️ Vitesse du vent: {weather.data.wind.speed} m/s
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Grp206WeatherApp;
