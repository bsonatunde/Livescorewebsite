import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';

function ScoresPage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFixture, setSelectedFixture] = useState('');
  const navigate = useNavigate();

  // Fetch live football scores from API-Football
  const fetchFootballScores = async () => {
    setLoading(true);
    const url = 'https://v3.football.api-sports.io/fixtures?live=all';
    const options = {
      method: 'GET',
      headers: {
        'x-apisports-key': '7d19086020a99cbd7ef586cca821c31f'
      }
    };
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setMatches(data.response || []);
    } catch {
      setMatches([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFootballScores();
  }, []);

  // Load Google AdSense and Streaming Availability JS library
  useEffect(() => {
    const adsScript = document.createElement('script');
    adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    adsScript.async = true;
    document.body.appendChild(adsScript);

    const streamingScript = document.createElement('script');
    streamingScript.src = 'https://cdn.jsdelivr.net/gh/movieofthenight/ts-streaming-availability@v4.4.0/bundle.min.js';
    streamingScript.async = true;
    document.body.appendChild(streamingScript);

    // Inject custom script (minified JS block)
    const customScript = document.createElement('script');
    customScript.type = 'text/javascript';
    customScript.text = `(function(sttc){'use strict';var aa=Object.defineProperty,ba=globalThis,ca=typeof Symbol==="function"&&typeof Symbol("x")==="symbol",da={},ea={};function fa(a,b,c){if(!c||a!=null){c=ea[b];if(c==null)return a[b];c=a[c];return c!==void 0?c:a[b]}} 
function ha(a,b,c){if(b)a:{var d=a.split(".");a=d.length===1;var e=d[0],f;!a&&e in da?f=da:f=ba;for(e=0;e<d.length-1;e++){var g=d[e];if(!(g in f))break a;f=f[g]}d=d[d.length-1];c=ca&&c==="es6"?f[d]:null;b=b(c);b!=null&&(a?aa(da,d,{configurable:!0,writable:!0,value:b}):b!==c&&(ea[d]===void 0&&(a=Math.random()*1E9>>>0,ea[d]=ca?ba.Symbol(d):"$jscp$"+a+"$"+d),aa(f,ea[d],{configurable:!0,writable:!0,value:b})))}}ha("Symbol.dispose",function(a){return a?a:Symbol("Symbol.dispose")},"es_next");/* ...truncated for brevity... */ });`;
    document.body.appendChild(customScript);

    return () => {
      document.body.removeChild(adsScript);
      document.body.removeChild(streamingScript);
      if (customScript.parentNode) {
        customScript.parentNode.removeChild(customScript);
      }
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', padding: '0', margin: '0', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', padding: '32px 0 16px 0', background: 'rgba(255,255,255,0.85)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: 0, color: '#1a237e', letterSpacing: '1px' }}>Live Football Scores</h1>
        <button onClick={fetchFootballScores} style={{ marginTop: '18px', padding: '10px 28px', fontSize: '1.1rem', fontWeight: 600, background: 'linear-gradient(90deg,#1976d2,#64b5f6)', color: '#fff', border: 'none', borderRadius: '24px', boxShadow: '0 2px 8px rgba(25,118,210,0.08)', cursor: 'pointer', transition: 'background 0.2s' }}>Refresh Scores</button>
      </header>
      {/* Google AdSense */}
      <div style={{ margin: '24px auto 0 auto', maxWidth: '900px' }}>
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
          data-ad-slot="1234567890"
          data-ad-format="auto"
        ></ins>
      </div>
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 12px' }}>
        {/* Lineup selection UI */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <label htmlFor="fixture-select" style={{ fontWeight: 600, fontSize: '1.1rem', marginRight: '12px', color: '#1976d2' }}>Select Fixture for Lineups:</label>
          <select
            id="fixture-select"
            value={selectedFixture}
            onChange={e => setSelectedFixture(e.target.value)}
            style={{ padding: '8px 16px', fontSize: '1rem', borderRadius: '8px', border: '1px solid #b3c2e1', marginRight: '12px', minWidth: '180px' }}
          >
            <option value="">-- Choose a fixture --</option>
            {matches.map(match => (
              <option key={match.fixture.id} value={match.fixture.id}>
                {match.league.name}: {match.teams.home.name} vs {match.teams.away.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => selectedFixture && navigate(`/lineups/${selectedFixture}`)}
            disabled={!selectedFixture}
            style={{ padding: '8px 24px', fontSize: '1rem', fontWeight: 600, background: '#1976d2', color: '#fff', border: 'none', borderRadius: '8px', cursor: selectedFixture ? 'pointer' : 'not-allowed', boxShadow: '0 2px 8px rgba(25,118,210,0.08)' }}
          >
            Show Lineups
          </button>
        </div>
        {/* ...existing code for matches... */}
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '60px', color: '#1976d2', fontSize: '1.3rem' }}>Loading...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', justifyContent: 'center' }}>
            {matches.length === 0 ? (
              <div style={{ textAlign: 'center', fontSize: '1.2rem', color: '#333', gridColumn: '1/-1' }}>No live matches found.</div>
            ) : (
              matches.map(match => (
                <div key={match.fixture.id} style={{ background: '#fff', borderRadius: '18px', boxShadow: '0 4px 24px rgba(25,118,210,0.08)', padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '220px', transition: 'box-shadow 0.2s', border: '1px solid #e3eafc' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1976d2', marginBottom: '12px', textAlign: 'center' }}>{match.league.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginBottom: '16px', width: '100%' }}>
                    <span style={{ fontWeight: 500, fontSize: '1.1rem', color: '#333', flex: 1, textAlign: 'right' }}>{match.teams.home.name}</span>
                    <span style={{ fontWeight: 700, fontSize: '1.3rem', color: '#1a237e', margin: '0 12px' }}>{match.goals.home} - {match.goals.away}</span>
                    <span style={{ fontWeight: 500, fontSize: '1.1rem', color: '#333', flex: 1, textAlign: 'left' }}>{match.teams.away.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '8px', fontSize: '1rem', color: '#555' }}>
                    <span>Status: <span style={{ fontWeight: 600 }}>{match.fixture.status.long}</span></span>
                    <span>{new Date(match.fixture.date).toLocaleString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
      <footer style={{
        background: 'linear-gradient(90deg, #1a237e 0%, #1976d2 100%)',
        color: '#fff',
        padding: '28px 0 0 0',
        fontSize: '1.08rem',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        boxShadow: '0 -2px 12px rgba(25,118,210,0.10)',
        borderTop: '1px solid #e3eafc',
        letterSpacing: '0.5px',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', fontSize: '1.09rem', fontWeight: 600 }}>
            <span style={{ color: '#90caf9', fontSize: '1.13rem', fontWeight: 700 }}>Onatunde Samuel (Bsonat)</span>
            <span style={{ color: '#bbdefb', fontWeight: 500 }}>Contact: <a href="tel:08138873454" style={{ color: '#fff', textDecoration: 'none', marginRight: '8px' }}>08138873454</a> <a href="tel:08069311709" style={{ color: '#fff', textDecoration: 'none' }}>08069311709</a></span>
            <span style={{ color: '#bbdefb', fontWeight: 500 }}>Email: <a href="mailto:onatunde,samuel@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>onatunde,samuel@gmail.com</a></span>

          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', fontSize: '1.05rem', fontWeight: 500 }}>
            <span style={{ color: '#90caf9', fontWeight: 600 }}>Bsonat Football Dashboard</span>
            <span style={{ color: '#bbdefb' }}>Powered by API-Football</span>
            <span style={{ color: '#90caf9', fontSize: '1.01rem', fontWeight: 400 }}>2025 &copy; All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LineupsPage() {
  const { fixtureId } = useParams();
  const navigate = useNavigate();
  const [lineups, setLineups] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  useEffect(() => {
    const fetchLineups = async () => {
      setLoading(true);
      setError("");
      const url = `https://v3.football.api-sports.io/fixtures/lineups?fixture=${fixtureId}`;
      const options = {
        method: 'GET',
        headers: {
          'x-apisports-key': '7d19086020a99cbd7ef586cca821c31f'
        }
      };
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        if (data.errors && (data.errors.message || data.errors['message'])) {
          setError(data.errors.message || data.errors['message'] || "Content unavailable. Resource was not cached.");
          setLineups([]);
        } else if (data.response && data.response.length === 0) {
          setError("No lineup data found for this fixture.");
          setLineups([]);
        } else {
          setLineups(data.response || []);
        }
      } catch {
        setError("Unable to fetch lineup data. Please try again later.");
        setLineups([]);
      }
      setLoading(false);
    };
    fetchLineups();
  }, [fixtureId]);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', padding: '0', margin: '0', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', padding: '32px 0 16px 0', background: 'rgba(255,255,255,0.85)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, margin: 0, color: '#1a237e', letterSpacing: '1px' }}>Lineups</h1>
        <button onClick={() => navigate('/')} style={{ marginTop: '18px', padding: '10px 28px', fontSize: '1.1rem', fontWeight: 600, background: 'linear-gradient(90deg,#1976d2,#64b5f6)', color: '#fff', border: 'none', borderRadius: '24px', boxShadow: '0 2px 8px rgba(25,118,210,0.08)', cursor: 'pointer', transition: 'background 0.2s' }}>Back to Scores</button>
      </header>
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 12px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '60px', color: '#1976d2', fontSize: '1.3rem' }}>Loading...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', fontSize: '1.2rem', color: '#d32f2f', marginTop: '40px' }}>{error}</div>
        ) : lineups.length === 0 ? (
          <div style={{ textAlign: 'center', fontSize: '1.2rem', color: '#333', marginTop: '40px' }}>No lineup data found for this fixture.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', justifyContent: 'center', marginBottom: '32px' }}>
            {lineups.map((lineup, idx) => (
              <div key={lineup.team.id || idx} style={{ background: '#f8faff', borderRadius: '18px', boxShadow: '0 4px 24px rgba(25,118,210,0.08)', padding: '24px 20px', minHeight: '220px', border: '1px solid #e3eafc' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1976d2', marginBottom: '10px', textAlign: 'center' }}>{lineup.team.name}</h3>
                {lineup.team.logo && <img src={lineup.team.logo} alt={lineup.team.name} style={{ width: '48px', marginBottom: '10px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />}
                <div style={{ marginBottom: '8px', fontWeight: 500 }}>Coach: {lineup.coach && lineup.coach.name}</div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Formation:</strong> {lineup.formation}
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Start XI:</strong>
                  <ul style={{ paddingLeft: '18px', margin: 0 }}>
                    {lineup.startXI && lineup.startXI.map((player, i) => (
                      <li key={player.player.id || i} style={{ marginBottom: '4px' }}>
                        {player.player.name} <span style={{ color: '#555' }}>#{player.player.number} ({player.player.pos})</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Substitutes:</strong>
                  <ul style={{ paddingLeft: '18px', margin: 0 }}>
                    {lineup.substitutes && lineup.substitutes.map((player, i) => (
                      <li key={player.player.id || i} style={{ marginBottom: '4px' }}>
                        {player.player.name} <span style={{ color: '#555' }}>#{player.player.number} ({player.player.pos})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer style={{
        background: 'linear-gradient(90deg, #1a237e 0%, #1976d2 100%)',
        color: '#fff',
        padding: '28px 0 0 0',
        fontSize: '1.08rem',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        boxShadow: '0 -2px 12px rgba(25,118,210,0.10)',
        borderTop: '1px solid #e3eafc',
        letterSpacing: '0.5px',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', fontSize: '1.09rem', fontWeight: 600 }}>
            <span style={{ color: '#90caf9', fontSize: '1.13rem', fontWeight: 700 }}>Onatunde Samuel (Bsonat)</span>
            <span style={{ color: '#bbdefb', fontWeight: 500 }}>Contact: <a href="tel:08138873454" style={{ color: '#fff', textDecoration: 'none', marginRight: '8px' }}>08138873454</a> <a href="tel:08069311709" style={{ color: '#fff', textDecoration: 'none' }}>08069311709</a></span>
            <span style={{ color: '#bbdefb', fontWeight: 500 }}>Email: <a href="mailto:onatunde,samuel@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>onatunde,samuel@gmail.com</a></span>

          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', fontSize: '1.05rem', fontWeight: 500 }}>
            <span style={{ color: '#90caf9', fontWeight: 600 }}>Bsonat Football Dashboard</span>
            <span style={{ color: '#bbdefb' }}>Powered by API-Football</span>
            <span style={{ color: '#90caf9', fontSize: '1.01rem', fontWeight: 400 }}>2025 &copy; All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ScoresPage />} />
        <Route path="/lineups/:fixtureId" element={<LineupsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
