/**
 *
 * Main component that contains the digimon items/cards
 * api source: https://digimon-api.vercel.app/
 *
 */

import React, { useState, useEffect } from "react";
import axios from "axios";

const api_url = "https://digimon-api.vercel.app/api/digimon";

function Main() {
  const [digimons, setDigimons] = useState([]);
  const [loadDigimons, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDigi, setFilter] = useState([]);

  // Use effect for getting the digi api
  useEffect(() => {
    axios
      .get(api_url)
      .then((res) => {
        setDigimons(res.data);
        setFilter(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Error when fetching Digimon data:", e);
        setLoading(false);
      });
  }, []);

  // Search Function
  const searchFeature = (e) => {
    const query = e.target.value.toLowerCase();
    // console.log(typeof query, query);
    setSearch(query);

    const filteredList = digimons.filter((digi) => {
      const nameMatch = digi.name.toLowerCase().includes(query);
      const levelMatch = digi.level.toLowerCase().includes(query);

      // console.log(`Searching for: ${query}`);
      // console.log(
      //   `Checking Digimon: ${digi.name.toLowerCase()} (name match: ${nameMatch}, level match: ${levelMatch})`
      // );

      return nameMatch || levelMatch;
    });

    // console.log(digimons);
    // console.log(filteredList);

    setFilter(filteredList);
  };

  return (
    <div id="main-section">
      {/* Shop Title and About section */}
      <h1 id="digimon-world-title">Digimon World</h1>
      <p id="about-p">
        Welcome to Digi World. A place where you can find and select your
        Digimon
      </p>

      {/* Search Feature */}
      <input
        type="text"
        className="search-bar"
        placeholder="search for a digimon"
        value={search}
        onChange={searchFeature}
      />

      {loadDigimons ? (
        <p>Loading all digimons...</p>
      ) : (
        <div className="digimons-list">
          {filterDigi.map((digimon, i) => (
            <div key={i} className="digimon-box">
              <img src={digimon.img} alt={digimon.name} />
              <h2>{digimon.name}</h2>
              <p>Level: {digimon.level}</p>
              <div className="button-group">
                <button
                  className="add-button"
                  // onClick={() => handleAddToFavorites(digimon)}
                >
                  Add
                </button>
                <button
                  className="trash-button"
                  // onClick={() => handleRemoveFromFavorites(digimon)}
                >
                  Trash
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Main;
