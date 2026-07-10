import React, { useState, useEffect } from "react";
import gameData from "./weeks_data.json";
import resultsData from "./nfl_results.json";

function weekLabel(week, season) {
  if (season === 2025) {
    switch (week) {
      case "HOF":
        return "HOF Weekend";
      case "PS1":
        return "Preseason Week 1";
      case "PS2":
        return "Preseason Week 2";
      case "PS3":
        return "Preseason Week 3";
      default:
        if (typeof week === "number") {
          if (week >= 1 && week <= 18) return `Week ${week}`;
          if (week >= 19 && week <= 22) return `Playoffs Week ${week - 18}`;
        }
        return `Week ${week}`;
    }
  } else {
    if (week >= 1 && week <= 18) return `Week ${week}`;
    if (week >= 19 && week <= 22) return `Playoffs Week ${week - 18}`;
    return `Week ${week}`;
  }
}

const availableWeeks2025 = [
  "HOF",
  "PS1",
  "PS2",
  "PS3",
  ...Array.from({ length: 18 }, (_, i) => i + 1),
  19,
  20,
  21,
  22,
];

const availableWeeks2024 = [...Array(23).keys()].filter((w) => w >= 1);

// ESPN team logos map
const teamLogos = {
  Cardinals: "https://a.espncdn.com/i/teamlogos/nfl/500/ari.png",
  Cowboys: "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png",
  Lions: "https://a.espncdn.com/i/teamlogos/nfl/500/det.png",
  Chiefs: "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png",
  Rams: "https://a.espncdn.com/i/teamlogos/nfl/500/lar.png",
  Dolphins: "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png",
  Vikings: "https://a.espncdn.com/i/teamlogos/nfl/500/min.png",
  Giants: "https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png",
  Eagles: "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png",
  Steelers: "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png",
  "49ers": "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png",
  Buccaneers: "https://a.espncdn.com/i/teamlogos/nfl/500/tb.png",
  Titans: "https://a.espncdn.com/i/teamlogos/nfl/500/ten.png",
  Ravens: "https://a.espncdn.com/i/teamlogos/nfl/500/bal.png",
  Packers: "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png",
  Bills: "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png",
  Panthers: "https://a.espncdn.com/i/teamlogos/nfl/500/car.png",
  Saints: "https://a.espncdn.com/i/teamlogos/nfl/500/no.png",
  Texans: "https://a.espncdn.com/i/teamlogos/nfl/500/hou.png",
  Colts: "https://a.espncdn.com/i/teamlogos/nfl/500/ind.png",
  Bears: "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png",
  Patriots: "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png",
  Bengals: "https://a.espncdn.com/i/teamlogos/nfl/500/cin.png",
  Browns: "https://a.espncdn.com/i/teamlogos/nfl/500/cle.png",
  Jaguars: "https://a.espncdn.com/i/teamlogos/nfl/500/jax.png",
  Raiders: "https://a.espncdn.com/i/teamlogos/nfl/500/lv.png",
  Chargers: "https://a.espncdn.com/i/teamlogos/nfl/500/lac.png",
  Broncos: "https://a.espncdn.com/i/teamlogos/nfl/500/den.png",
  Seahawks: "https://a.espncdn.com/i/teamlogos/nfl/500/sea.png",
  Commanders: "https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png",
  Jets: "https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png",
  Falcons: "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png",
};

// Map ESPN full team names to simplified keys
function normalizeTeamName(name) {
  const map = {
    "Arizona Cardinals": "Cardinals",
    "Dallas Cowboys": "Cowboys",
    "Detroit Lions": "Lions",
    "Kansas City Chiefs": "Chiefs",
    "Los Angeles Rams": "Rams",
    "Miami Dolphins": "Dolphins",
    "Minnesota Vikings": "Vikings",
    "New York Giants": "Giants",
    "Philadelphia Eagles": "Eagles",
    "Pittsburgh Steelers": "Steelers",
    "San Francisco 49ers": "49ers",
    "Tampa Bay Buccaneers": "Buccaneers",
    "Tennessee Titans": "Titans",
    "Baltimore Ravens": "Ravens",
    "Green Bay Packers": "Packers",
    "Buffalo Bills": "Bills",
    "Carolina Panthers": "Panthers",
    "New Orleans Saints": "Saints",
    "Houston Texans": "Texans",
    "Indianapolis Colts": "Colts",
    "Chicago Bears": "Bears",
    "New England Patriots": "Patriots",
    "Cincinnati Bengals": "Bengals",
    "Cleveland Browns": "Browns",
    "Jacksonville Jaguars": "Jaguars",
    "Las Vegas Raiders": "Raiders",
    "Los Angeles Chargers": "Chargers",
    "Denver Broncos": "Broncos",
    "Seattle Seahawks": "Seahawks",
    "Washington Commanders": "Commanders",
    "New York Jets": "Jets",
    "Atlanta Falcons": "Falcons",
  };
  return map[name] || name;
}

// Function to determine current week in 2025
function getCurrentWeek2025() {
  const now = new Date();

  // Preseason ranges
  const preseasonRanges = [
    {
      week: "HOF",
      start: new Date("2025-07-31T00:00:00Z"),
      end: new Date("2025-08-06T23:59:59Z"),
    },
    {
      week: "PS1",
      start: new Date("2025-08-07T00:00:00Z"),
      end: new Date("2025-08-13T23:59:59Z"),
    },
    {
      week: "PS2",
      start: new Date("2025-08-14T00:00:00Z"),
      end: new Date("2025-08-20T23:59:59Z"),
    },
    {
      week: "PS3",
      start: new Date("2025-08-21T00:00:00Z"),
      end: new Date("2025-08-31T23:59:59Z"),
    },
  ];

  // Check if in preseason
  for (const range of preseasonRanges) {
    if (now >= range.start && now <= range.end) {
      return range.week;
    }
  }

  const regularSeasonStart = new Date("2025-09-04T00:00:00Z");
  if (now < regularSeasonStart) return "PS3";

  // Calculate regular season week
  const weekDiff =
    Math.floor((now - regularSeasonStart) / (7 * 24 * 60 * 60 * 1000)) + 1;
  if (weekDiff >= 1 && weekDiff <= 18) return weekDiff;

  const playoffsStart = new Date("2026-01-11T00:00:00Z");
  if (now < playoffsStart) return 18;

  // Calculate playoff week
  const playoffWeekDiff =
    Math.floor((now - playoffsStart) / (7 * 24 * 60 * 60 * 1000)) + 1;
  if (playoffWeekDiff >= 1 && playoffWeekDiff <= 4) return 18 + playoffWeekDiff;

  return 22;
}

function NflPage() {
  const [games, setGames] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState(2024);
  const [showPredictions, setShowPredictions] = useState(false);
  const [blink, setBlink] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [gamesDataCache, setGamesDataCache] = useState({});

  // Blinking dot effect for live games
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Set current season and week on initial load
  useEffect(() => {
    if (initialLoad) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const season = currentYear >= 2025 ? 2025 : 2024;
      setSelectedSeason(season);
      setSelectedWeek(season === 2025 ? getCurrentWeek2025() : 1);
      setInitialLoad(false);
    }
  }, [initialLoad]);

  const sortedGames = [...games].sort((a, b) => {
    if (a.isFinal && !b.isFinal) return 1;
    if (!a.isFinal && b.isFinal) return -1;
    if (a.isLive && !b.isLive) return -1;
    if (!a.isLive && b.isLive) return 1;
    return 0;
  });

  const LiveDot = () => (
    <span
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        marginRight: 6,
        backgroundColor: "red",
        borderRadius: "50%",
        opacity: blink ? 1 : 0.3,
        transition: "opacity 0.5s ease-in-out",
      }}
    />
  );

  useEffect(() => {
    const loadGames = async () => {
      setError(null);

      if (selectedSeason === 2025) {
        const preseasonRanges = {
          HOF: ["2025-07-31", "2025-08-06"],
          PS1: ["2025-08-07", "2025-08-13"],
          PS2: ["2025-08-14", "2025-08-20"],
          PS3: ["2025-08-21", "2025-08-31"],
        };

        try {
          let allEvents = [];

          if (["HOF", "PS1", "PS2", "PS3"].includes(selectedWeek)) {
            const [startDateStr, endDateStr] = preseasonRanges[selectedWeek];
            const startDate = new Date(startDateStr + "T00:00:00Z");
            const endDate = new Date(endDateStr + "T23:59:59Z");

            const datesToFetch = [];
            for (
              let d = new Date(startDate);
              d <= endDate;
              d.setUTCDate(d.getUTCDate() + 1)
            ) {
              datesToFetch.push(
                `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(
                  2,
                  "0",
                )}${String(d.getUTCDate()).padStart(2, "0")}`,
              );
            }

            const fetches = datesToFetch.map((dateStr) =>
              fetch(
                `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=${dateStr}`,
              ).then((res) =>
                res.ok
                  ? res.json()
                  : Promise.reject(`Failed to fetch date ${dateStr}`),
              ),
            );

            const results = await Promise.all(fetches);
            results.forEach(
              (data) => data.events && allEvents.push(...data.events),
            );
          } else if (typeof selectedWeek === "number") {
            let weekStartDate;
            if (selectedWeek >= 1 && selectedWeek <= 18) {
              weekStartDate = new Date(
                new Date("2025-09-04T00:00:00Z").getTime() +
                  (selectedWeek - 1) * 7 * 24 * 60 * 60 * 1000,
              );
            } else if (selectedWeek >= 19 && selectedWeek <= 22) {
              const playoffStarts = {
                19: "2026-01-11", 
                20: "2026-01-18", 
                21: "2026-01-25", 
                22: "2026-02-08", 
              };

              weekStartDate = new Date(
                playoffStarts[selectedWeek] + "T00:00:00Z",
              );
            }

            if (weekStartDate) {
              const datesToFetch = [];
              for (let i = 0; i < 7; i++) {
                const d = new Date(
                  weekStartDate.getTime() + i * 24 * 60 * 60 * 1000,
                );
                datesToFetch.push(
                  `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(
                    2,
                    "0",
                  )}${String(d.getUTCDate()).padStart(2, "0")}`,
                );
              }

              const fetches = datesToFetch.map((dateStr) =>
                fetch(
                  `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=${dateStr}`,
                ).then((res) =>
                  res.ok
                    ? res.json()
                    : Promise.reject(`Failed to fetch date ${dateStr}`),
                ),
              );

              const results = await Promise.all(fetches);
              results.forEach(
                (data) => data.events && allEvents.push(...data.events),
              );
            }
          }

          setGamesDataCache((prev) => {
            const newCache = { ...prev };

            allEvents.forEach((event) => {
              const eventId = event.id;
              const competition = event.competitions?.[0];
              const currentOdds = competition?.odds?.[0];

              // Kickoff time from ESPN API
              const kickoff = new Date(event.date);
              const now = new Date();

              // If we are less than 1 hour before kickoff, lock odds (don’t overwrite)
              const isLocked =
                kickoff.getTime() - now.getTime() <= 60 * 60 * 1000;

              if (!isLocked) {
                // Only update cache while not locked
                if (
                  currentOdds &&
                  currentOdds.spread !== 0 &&
                  currentOdds.overUnder !== 0 &&
                  currentOdds.spread !== null &&
                  currentOdds.overUnder !== null
                ) {
                  // Store fresh pregame odds
                  newCache[eventId] = JSON.parse(JSON.stringify(event));
                }
              } else if (!newCache[eventId]) {
                // If locked but no cache yet, store once
                if (
                  currentOdds &&
                  currentOdds.spread !== 0 &&
                  currentOdds.overUnder !== 0
                ) {
                  newCache[eventId] = JSON.parse(JSON.stringify(event));
                }
              }
            });

            return newCache;
          });

          const uniqueEvents = Array.from(
            new Map(allEvents.map((event) => [event.id, event])).values(),
          );

          // Then update the game mapping logic with the improved odds selection
          const liveGames = uniqueEvents.map((event) => {
            const cachedEvent = gamesDataCache[event.id] || event;
            const competition = event.competitions[0];
            const cachedCompetition = cachedEvent.competitions[0];

            const homeTeamData = competition.competitors.find(
              (t) => t.homeAway === "home",
            );
            const awayTeamData = competition.competitors.find(
              (t) => t.homeAway === "away",
            );
            const home = normalizeTeamName(homeTeamData.team.displayName);
            const away = normalizeTeamName(awayTeamData.team.displayName);

            const statusType = event.status.type.name;
            const isLive = statusType === "STATUS_IN_PROGRESS";
            const isFinal =
              statusType === "STATUS_FINAL" ||
              statusType === "STATUS_POSTPONED";

            // Get odds - ALWAYS use pregame odds if current odds are 0 or invalid
            const liveOdds = competition.odds?.[0];
            const pregameOdds = cachedCompetition.odds?.[0];

            let odds;
            let oddsSource = "default";

            // Check if current odds are invalid (0, null, or undefined)
            const liveOddsInvalid =
              !liveOdds ||
              liveOdds.spread === 0 ||
              liveOdds.overUnder === 0 ||
              liveOdds.spread === null ||
              liveOdds.overUnder === null;

            // Check if pregame odds are valid (not 0 and not null)
            const pregameOddsValid =
              pregameOdds &&
              pregameOdds.spread !== 0 &&
              pregameOdds.overUnder !== 0 &&
              pregameOdds.spread !== null &&
              pregameOdds.overUnder !== null;

            if (pregameOddsValid) {
              // Always use pregame odds if they're valid, regardless of live odds
              odds = pregameOdds;
              oddsSource = "pregame";
            } else if (!liveOddsInvalid) {
              // Use live odds only if they're valid AND we don't have valid pregame odds
              odds = liveOdds;
              oddsSource = "live";
            } else {
              // Default if no valid odds available
              odds = { spread: 0, overUnder: 0, details: "" };
              oddsSource = "default";
            }

            // Normalize spread
            let spread = 0;
            if (
              odds.details &&
              odds.spread !== null &&
              odds.spread !== undefined &&
              odds.spread !== 0
            ) {
              const rawSpread = parseFloat(odds.spread);
              const absSpread = Math.abs(rawSpread);
              const favoredTeam = odds.details.toLowerCase();
              const awayLower = away.toLowerCase();
              const homeLower = home.toLowerCase();

              spread = favoredTeam.includes(awayLower)
                ? absSpread
                : favoredTeam.includes(homeLower)
                  ? -absSpread
                  : rawSpread;
            }

            const homeScore = parseInt(homeTeamData.score || "0");
            const awayScore = parseInt(awayTeamData.score || "0");

            // Calculate actual spread and total for finished games
            let actualSpread = null;
            let actualTotal = null;
            let outcome = null;

            if (isFinal && homeScore !== null && awayScore !== null) {
              actualSpread = awayScore - homeScore;
              actualTotal = awayScore + homeScore;

              if (homeScore > awayScore) {
                outcome = `${home} Win`;
              } else if (awayScore > homeScore) {
                outcome = `${away} Win`;
              } else {
                outcome = "Draw";
              }
            }

            return {
              id: event.id,
              Game: `${away} @ ${home}`,
              Spread: spread,
              Total: parseFloat(odds.overUnder || 0),
              isLive,
              isFinal,
              homeScore,
              awayScore,
              ActualSpread: actualSpread,
              ActualTotal: actualTotal,
              Outcome: outcome,
              oddsSource,
              oddsDetails: odds.details || "",
            };
          });

          setGames(liveGames);
        } catch (err) {
          console.error("Failed to fetch live games:", err);
          setError("Could not load live games for 2025");
          setGames([]);
        }
      } else {
        // 2024 - load from local JSON
        if (selectedWeek < 1 || selectedWeek > 22) {
          setGames([]);
          return;
        }

        const weekKey = `week${selectedWeek}`;
        if (gameData[weekKey]) {
          const gamesForWeek = gameData[weekKey];
          const resultsForWeek = resultsData.filter(
            (r) => r.Week === selectedWeek,
          );

          const enrichedGames = gamesForWeek.map((game) => {
            const [awayTeam, homeTeam] = game.Game.split(" @ ");
            const result = resultsForWeek.find(
              (r) =>
                (r.Team === homeTeam && r.Opp === awayTeam) ||
                (r.Team === awayTeam && r.Opp === homeTeam),
            );

            let homeScore = null;
            let awayScore = null;
            if (result) {
              homeScore = result.Home === 1 ? result.Off_Pts : result.Def_Pts;
              awayScore = result.Home === 1 ? result.Def_Pts : result.Off_Pts;
            }

            return {
              ...game,
              ActualSpread: result ? result.Spread : null,
              ActualTotal: result ? result.Total : null,
              Outcome: result
                ? result.Win === 1
                  ? `${result.Team} Win`
                  : `${result.Opp} Win`
                : "Unknown",
              homeScore,
              awayScore,
              isFinal: !!result,
              isLive: false,
            };
          });

          setGames(enrichedGames);
        } else {
          setGames([]);
        }
      }
    };

    loadGames();
  }, [selectedWeek, selectedSeason, gamesDataCache]);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          week: selectedWeek,
          season: selectedSeason,
          games,
        }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.statusText}`);

      const data = await response.json();
      setPredictions(data.predictions || []);
      setShowPredictions(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>NFL Spread Predictions</h1>

      {error && <div className="error-message">Error: {error}</div>}

      <div className="selectors">
        <label>Season:</label>
        <select
          value={selectedSeason}
          onChange={(e) => {
            setSelectedSeason(parseInt(e.target.value));
            setShowPredictions(false);
            setSelectedWeek(
              e.target.value === "2025" ? getCurrentWeek2025() : 1,
            );
          }}
        >
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>

        <label>Week:</label>
        <select
          value={selectedWeek}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedWeek(
              selectedSeason === 2025 && isNaN(Number(val)) ? val : Number(val),
            );
            setShowPredictions(false);
          }}
        >
          {(selectedSeason === 2025
            ? availableWeeks2025
            : availableWeeks2024
          ).map((week) => (
            <option key={week} value={week}>
              {weekLabel(week, selectedSeason)}
            </option>
          ))}
        </select>

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Fetching Predictions..." : "Get Predictions"}
        </button>
      </div>

      <h2>Game Data</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Game</th>
            <th>Spread</th>
            <th>Total</th>
            <th>Score</th>
            {selectedSeason === 2025 && <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {sortedGames.length > 0 ? (
            sortedGames.map((game, idx) => {
              const [awayTeam, homeTeam] = game.Game.split(" @ ");
              return (
                <tr key={idx}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <img
                      src={teamLogos[awayTeam]}
                      alt={`${awayTeam} logo`}
                      style={{
                        width: 25,
                        height: 25,
                        marginRight: 10,
                        verticalAlign: "middle",
                      }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    {awayTeam} @
                    <img
                      src={teamLogos[homeTeam]}
                      alt={`${homeTeam} logo`}
                      style={{
                        width: 25,
                        height: 25,
                        marginLeft: 10,
                        marginRight: 10,
                        verticalAlign: "middle",
                      }}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    {homeTeam}
                  </td>
                  <td>{game.Spread?.toFixed(1)}</td>
                  <td>{game.Total?.toFixed(1)}</td>
                  <td>
                    {game.awayScore !== null && game.homeScore !== null
                      ? `${game.awayScore} - ${game.homeScore}`
                      : "N/A"}
                  </td>
                  {selectedSeason === 2025 && (
                    <td>
                      {game.isLive && (
                        <>
                          <LiveDot /> LIVE
                        </>
                      )}
                      {game.isFinal && "FINAL"}
                      {!game.isLive && !game.isFinal && "UPCOMING"}
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={selectedSeason === 2025 ? 5 : 4}>
                No games available for this week.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showPredictions && predictions.length > 0 && (
        <>
          <h2>Predictions</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Game</th>
                <th>Spread</th>
                <th>Total</th>
                <th>Predicted Spread</th>
                <th>Predicted Outcome</th>
                <th>Actual Spread</th>
                <th>Actual Total</th>
                <th>Final Score</th>
                <th>Outcome</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((pred, idx) => {
                const [awayTeam, homeTeam] = pred.game.split(" @ ");
                const game = games.find((g) => g.Game === pred.game);
                const finalScore =
                  game && game.homeScore !== null && game.awayScore !== null
                    ? `${game.awayScore} - ${game.homeScore}`
                    : "N/A";

                return (
                  <tr key={idx}>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <img
                        src={teamLogos[awayTeam]}
                        alt={`${awayTeam} logo`}
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 10,
                          verticalAlign: "middle",
                        }}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                      {awayTeam} @
                      <img
                        src={teamLogos[homeTeam]}
                        alt={`${homeTeam} logo`}
                        style={{
                          width: 20,
                          height: 20,
                          marginLeft: 10,
                          marginRight: 10,
                          verticalAlign: "middle",
                        }}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                      {homeTeam}
                    </td>
                    <td>{pred.spread?.toFixed(1)}</td>
                    <td>{pred.total?.toFixed(1)}</td>
                    <td>{pred.predicted_spread?.toFixed(2)}</td>
                    <td>{pred.predicted_outcome}</td>
                    <td>
                      {game?.ActualSpread !== null
                        ? game.ActualSpread.toFixed(1)
                        : "N/A"}
                    </td>
                    <td>
                      {game?.ActualTotal !== null
                        ? game.ActualTotal.toFixed(1)
                        : "N/A"}
                    </td>
                    <td>{finalScore}</td>
                    <td>{game?.Outcome || "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default NflPage;
