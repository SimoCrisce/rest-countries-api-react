import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Countries = function ({ isDark }) {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [region, setRegion] = useState(null);
  const [query, setQuery] = useState("");

  const getCountries = () => {
    fetch(
      region
        ? "https://restcountries.com/v3.1/region/" + region
        : "https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population"
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel reperimento dei dati richiesti");
        }
      })
      .then((countries) => {
        setCountries(countries);
        setFilteredCountries(countries);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getCountries();
  }, [region]);

  useEffect(() => {
    filterCountries();
  }, [query, countries]);

  const filterCountries = () => {
    const filtered =
      countries &&
      countries.filter((country) => {
        return country.name.common.toLowerCase().includes(query.toLowerCase());
      });
    setFilteredCountries(filtered);
  };

  return (
    <main className="w-11/12 mx-auto mt-2">
      <div className="my-10 flex flex-col gap-6 md:flex-row justify-between">
        <div>
          <input
            type="text"
            placeholder="Search for a country..."
            className="py-4 ps-6 pe-6 sm:pe-48 shadow"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <select
              name="filter"
              id="filter"
              onChange={(e) => {
                setRegion(e.target.value);
              }}
              defaultValue
              className="py-4 px-6 shadow text-gray-500"
            >
              <option value="">Filter by Region</option>
              <option value="africa">Africa</option>
              <option value="america">America</option>
              <option value="asia">Asia</option>
              <option value="oceania">Oceania</option>
              <option value="europe">Europe</option>
            </select>
          </form>
        </div>
      </div>
      <div>
        {filteredCountries ? (
          <>
            {filteredCountries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
                {filteredCountries.map((country) => (
                  <div key={country.name.common} className={isDark ? "card" : "border"}>
                    <Link to={"/country/" + country.name.common}>
                      <img
                        src={country.flags.png}
                        alt={country.flags.alt ? country.flags.alt : ""}
                        className="h-50 md:h-44 w-full"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-bold">{country.name.common}</h3>
                        <p>
                          <span className="font-semibold">Population: </span>
                          {country.population.toLocaleString()}
                        </p>
                        <p>
                          <span className="font-semibold">Region: </span>
                          {country.region}
                        </p>
                        <p>
                          <span className="font-semibold">Capital: </span>
                          {country.capital}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <h2 className={`${isDark ? "text-white" : "text-black"} text-center text-3xl`}>No results found!</h2>
            )}
          </>
        ) : (
          <h2 className={`${isDark ? "text-white" : "text-black"} text-center text-3xl`}>Loading...</h2>
        )}
      </div>
    </main>
  );
};

export default Countries;
