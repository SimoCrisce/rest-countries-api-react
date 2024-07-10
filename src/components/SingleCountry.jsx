import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SingleCountry = function ({ isDark }) {
  const { name } = useParams();
  const [country, setCountry] = useState("");
  const getSingleCountry = () => {
    fetch("https://restcountries.com/v3.1/name/" + name)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel reperimento dei dati richiesti");
        }
      })
      .then((country) => setCountry(country[0]))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSingleCountry();
  }, []);
  const languages = Object.values(country && country.languages).join(", ");
  const currencies = Object.values(country && country.currencies);
  const currencyDetails = Object.values(currencies)
    .map((currency) => {
      return `${currency.name}`;
    })
    .join(", ");
  const nativeName = Object.values(country && country.name.nativeName);
  return (
    <div>
      <div className="w-11/12 flex flex-col items-start justify-between mx-auto">
        <div>
          <Link to="/">
            <div
              className={`w-full my-10 flex items-center gap-2 px-6 py-1 rounded-sm shadow border transition-all ${
                isDark ? "hover:text-black hover:bg-white" : "hover:text-white hover:bg-black"
              }`}
            >
              <span>
                <FaArrowLeftLong />
              </span>
              <span>Back</span>
            </div>
          </Link>
        </div>
        {country && (
          <div className="flex flex-col justify-between md:flex-row w-full">
            <div className="w-full md:w-5/12  ">
              <img src={country.flags.png} alt={country.flags.alt ? country.flags.alt : ""} className="w-full" />
            </div>
            <div className="flex flex-col justify-center gap-6 w-full md:w-6/12">
              <h2 className="text-3xl font-bold mt-3 md:mt-0">{country.name.common}</h2>
              <div className="grid grid-cols-1 gap-5 md:gap-0 md:grid-cols-2">
                <div>
                  <p>
                    <span className="font-bold">Native Name: </span>
                    {nativeName[0].common}
                  </p>
                  <p>
                    <span className="font-bold">Population: </span>
                    {country.population.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-bold">Region: </span>
                    {country.region}
                  </p>
                  <p>
                    <span className="font-bold">Sub Region: </span>
                    {country.subregion}
                  </p>
                  <p>
                    <span className="font-bold">Capital: </span>
                    {country.capital}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-bold">Top Level Domain: </span>
                    {country.tld}
                  </p>
                  <p>
                    <span className="font-bold">Currencies: </span>
                    {currencyDetails}
                  </p>
                  <p>
                    <span className="font-bold">Languages: </span>
                    <span>{languages}</span>
                  </p>
                </div>
              </div>
              <div className="pt-10">
                <p>
                  <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                    <span className="font-bold">Border Countries:</span>
                    {country.borders ? (
                      <div className="flex flex-wrap gap-1">
                        {country.borders.map((border) => (
                          <span key={border} className="border px-4 py-1 mx-1">
                            {border}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span>NONE</span>
                    )}
                  </div>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SingleCountry;
