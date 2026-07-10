import React, { useEffect, useState } from "react";

function WnbaPage() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const [availableDays, setAvailableDays] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getSportsToday = () => {
    const now = new Date();
    const estNow = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" }),
    );
    const sportsDayStart = new Date(estNow);
    sportsDayStart.setHours(8, 0, 0, 0);
    if (estNow < sportsDayStart)
      sportsDayStart.setDate(sportsDayStart.getDate() - 1);
    return sportsDayStart;
  };

  const getWeekDays = (offset = 0) => {
    const sportsToday = getSportsToday();
    const startOfWeek = new Date(sportsToday);
    startOfWeek.setDate(
      sportsToday.getDate() - sportsToday.getDay() + offset * 7,
    );
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return {
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        display: d.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
        }),
        value: formatDate(d),
      };
    });
  };

  const getDateParam = (dateStr) => dateStr.replace(/-/g, "");

  const fetchGamesForDay = async (day) => {
    const dateParam = getDateParam(day);
    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/scoreboard?dates=${dateParam}`,
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.events || [];
  };


  const updateAvailableDays = async (offset = weekOffset) => {
    const weekDays = getWeekDays(offset);
    const daysWithGames = [];

    for (const day of weekDays) {
      const events = await fetchGamesForDay(day.value);
      if (events.length > 0) {
        daysWithGames.push(day);
      }
    }

    setAvailableDays(daysWithGames);

    // If the selected day isn't in this week,
    // automatically select the first day with games.
    if (
      daysWithGames.length > 0 &&
      !daysWithGames.some((d) => d.value === selectedDay)
    ) {
      setSelectedDay(daysWithGames[0].value);
    }
  };

  const updateWeekOffsetForSelectedDay = (day) => {
    const sel = new Date(day);
    const sportsToday = getSportsToday();
    const currentWeekStart = new Date(sportsToday);
    currentWeekStart.setDate(sportsToday.getDate() - sportsToday.getDay());
    const diffInDays = Math.floor(
      (sel - currentWeekStart) / (24 * 60 * 60 * 1000),
    );
    const offset = Math.floor(diffInDays / 7);
    setWeekOffset(offset);
  };

  useEffect(() => {
    const init = async () => {
      const today = formatDate(getSportsToday());

      setSelectedDay(today);
      updateWeekOffsetForSelectedDay(today);
      setLoadingInitial(false);
    };

    init();
  }, []);

  useEffect(() => {
    if (!loadingInitial) {
      updateAvailableDays(weekOffset);
    }
  }, [weekOffset, loadingInitial]);

  // FETCH GAMES FOR SELECTED DAY
  useEffect(() => {
    if (!selectedDay) return;

    const fetchGames = async () => {
      setLoading(true);
      try {
        const events = await fetchGamesForDay(selectedDay);
        const wnbaGames = events.map((event) => {
          const comp = event.competitions[0];
          const home = comp.competitors.find((t) => t.homeAway === "home");
          const away = comp.competitors.find((t) => t.homeAway === "away");
          const state = comp.status?.type?.state || "pre";

          let status;
          if (state === "in") status = "In Progress";
          else if (state === "post") status = "Final";
          else
            status =
              new Date(event.date).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                timeZone: "America/New_York",
              }) + " ET";

          return {
            homeTeam: home.team.displayName,
            awayTeam: away.team.displayName,
            homeScore: home.score ?? "-",
            awayScore: away.score ?? "-",
            homeLogo: home.team.logo,
            awayLogo: away.team.logo,
            status,
          };
        });
        setGames(wnbaGames);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [selectedDay]);

  const weekDays = getWeekDays(weekOffset);
  const todayString = formatDate(getSportsToday());

  if (loadingInitial) return <p>Loading WNBA data...</p>;

  return (
    <div className="app-container">
      <h1>WNBA Scoreboard</h1>

      <div style={{ marginBottom: 10 }}>
        <label>
          Select a date:{" "}
          <input
            type="date"
            value={selectedDay || ""}
            onChange={(e) => {
              const day = e.target.value;
              setSelectedDay(day);
              updateWeekOffsetForSelectedDay(day);
            }}
          />
        </label>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <button
          onClick={() => {
            const newOffset = weekOffset - 1;
            setWeekOffset(newOffset);
          }}
        >
          ◀
        </button>
        <button
          onClick={() => {
            updateWeekOffsetForSelectedDay(todayString);
            setSelectedDay(todayString);
          }}
        >
          Today
        </button>
        <div style={{ display: "flex", gap: 5 }}>
          {availableDays.map((day) => (
            <button
              key={day.value}
              onClick={() => setSelectedDay(day.value)}
              disabled={selectedDay === day.value}
              style={{ position: "relative" }}
            >
              <div>{day.label}</div>
              <div style={{ fontSize: "0.8em" }}>{day.display}</div>
              {day.value === todayString && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "red",
                  }}
                  title="Today"
                />
              )}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            const newOffset = weekOffset + 1;
            setWeekOffset(newOffset);
          }}
        >
          ▶
        </button>
      </div>

      {loading && <p>Loading WNBA games...</p>}
      {!loading && games.length === 0 && <p>No games on this day.</p>}

      {games.length > 0 && (
        <table className="data-table">
          <thead>
            <tr>
              <th>Game</th>
              <th>Status</th>
              <th>Away</th>
              <th>Home</th>
            </tr>
          </thead>
          <tbody>
            {games.map((g, i) => (
              <tr key={i}>
                <td>
                  <img
                    src={g.awayLogo}
                    alt="away logo"
                    style={{
                      width: 24,
                      marginRight: 6,
                      verticalAlign: "middle",
                    }}
                  />
                  {g.awayTeam} @{" "}
                  <img
                    src={g.homeLogo}
                    alt="home logo"
                    style={{
                      width: 24,
                      marginLeft: 6,
                      marginRight: 6,
                      verticalAlign: "middle",
                    }}
                  />
                  {g.homeTeam}
                  {g.status === "In Progress" && (
                    <span className="live-indicator" title="Live"></span>
                  )}
                </td>
                <td>{g.status}</td>
                <td>{g.awayScore}</td>
                <td>{g.homeScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default WnbaPage;
