import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';

function ScoresPage() {
  const [matches, setMatches] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leaguesLoading, setLeaguesLoading] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('');
  const navigate = useNavigate();

  // Fetch live football scores from API-Football
  const fetchFootballScores = useCallback(async () => {
    setLoading(true);
    const url = selectedLeague 
      ? `https://v3.football.api-sports.io/fixtures?live=all&league=${selectedLeague}`
      : 'https://v3.football.api-sports.io/fixtures?live=all';
    const options = {
      method: 'GET',
      headers: {
        'x-apisports-key': '73757736d96873dd9bbf698666f28bdb'
      }
    };
    try {
      console.log('Fetching matches from:', url);
      const res = await fetch(url, options);
      const data = await res.json();
      console.log('API Response:', data);
      console.log('Matches found:', data.response?.length || 0);
      setMatches(data.response || []);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setMatches([]);
    }
    setLoading(false);
  }, [selectedLeague]);

  // Fetch popular leagues
  const fetchLeagues = useCallback(async () => {
    setLeaguesLoading(true);
    const url = 'https://v3.football.api-sports.io/leagues?current=true';
    const options = {
      method: 'GET',
      headers: {
        'x-apisports-key': '73757736d96873dd9bbf698666f28bdb'
      }
    };
    try {
      console.log('Fetching leagues from:', url);
      const res = await fetch(url, options);
      const data = await res.json();
      console.log('Leagues API Response:', data);
      // Filter for popular leagues only
      const popularLeagues = (data.response || []).filter(league => 
        ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Champions League', 'Europa League', 'World Cup', 'Copa America', 'Euro Championship'].includes(league.league.name)
      ).slice(0, 10);
      console.log('Popular leagues found:', popularLeagues.length);
      setLeagues(popularLeagues);
    } catch (error) {
      console.error('Error fetching leagues:', error);
      setLeagues([]);
    }
    setLeaguesLoading(false);
  }, []);

  useEffect(() => {
    fetchFootballScores();
    fetchLeagues();
  }, [selectedLeague, fetchFootballScores, fetchLeagues]);

  // Load Google AdSense and Streaming Availability JS library
  useEffect(() => {
    const adsScript = document.createElement('script');
    adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    adsScript.async = true;
    adsScript.onerror = () => console.log('AdSense blocked by ad blocker - this is normal');
    document.body.appendChild(adsScript);

    const streamingScript = document.createElement('script');
    streamingScript.src = 'https://cdn.jsdelivr.net/gh/movieofthenight/ts-streaming-availability@v4.4.0/bundle.min.js';
    streamingScript.async = true;
    streamingScript.onerror = () => console.log('Streaming script failed to load');
    document.body.appendChild(streamingScript);

    // Inject custom script (minified JS block)
    const customScript = document.createElement('script');
    customScript.type = 'text/javascript';
    customScript.text = `(function(sttc){'use strict';var aa=Object.defineProperty,ba=globalThis,ca=typeof Symbol==="function"&&typeof Symbol("x")==="symbol",da={},ea={};function fa(a,b,c){if(!c||a!=null){c=ea[b];if(c==null)return a[b];c=a[c];return c!==void 0?c:a[b]}} 
function ha(a,b,c){if(b)a:{var d=a.split(".");a=d.length===1;var e=d[0],f;!a&&e in da?f=da:f=ba;for(e=0;e<d.length-1;e++){var g=d[e];if(!(g in f))break a;f=f[g]}d=d[d.length-1];c=ca&&c==="es6"?f[d]:null;b=b(c);b!=null&&(a?aa(da,d,{configurable:!0,writable:!0,value:b}):b!==c&&(ea[d]===void 0&&(a=Math.random()*1E9>>>0,ea[d]=ca?ba.Symbol(d):"$jscp$"+a+"$"+d),aa(f,ea[d],{configurable:!0,writable:!0,value:b})))}}ha("Symbol.dispose",function(a){return a?a:Symbol("Symbol.dispose")},"es_next");/* ...truncated for brevity... */ });`;
    document.body.appendChild(customScript);

    return () => {
      if (adsScript.parentNode) {
        document.body.removeChild(adsScript);
      }
      if (streamingScript.parentNode) {
        document.body.removeChild(streamingScript);
      }
      if (customScript.parentNode) {
        customScript.parentNode.removeChild(customScript);
      }
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '0', margin: '0', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Responsive CSS for mobile view */}
      <style>{`
        @media (max-width: 700px) {
          header { padding: 24px 0 10px 0 !important; }
          main { padding: 18px 4px !important; }
          .footer-flex { flex-direction: column !important; align-items: flex-start !important; gap: 18px !important; }
          .footer-left, .footer-right { align-items: flex-start !important; text-align: left !important; font-size: 1rem !important; }
          .footer-left span, .footer-right span { font-size: 1rem !important; }
          .match-card { padding: 16px 12px !important; min-height: 180px !important; }
          .match-teams { flex-direction: column !important; gap: 8px !important; }
          .lineup-selector { flex-direction: column !important; align-items: center !important; gap: 12px !important; }
        }
        @media (max-width: 500px) {
          header h1 { font-size: 1.4rem !important; }
          button, select { font-size: 0.9rem !important; padding: 8px 16px !important; }
          .footer-left span, .footer-right span { font-size: 0.95rem !important; }
        }
      `}</style>
      <header style={{ 
        textAlign: 'center', 
        padding: '40px 20px 20px 20px', 
        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)', 
        boxShadow: '0 4px 20px rgba(26,35,126,0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            margin: 0, 
            color: '#ffffff', 
            letterSpacing: '2px',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            marginBottom: '8px'
          }}>⚽ LIVE FOOTBALL SCORES</h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'rgba(255,255,255,0.9)', 
            margin: '0 0 24px 0',
            fontWeight: 400
          }}>Real-time match updates and team lineups</p>
          <button 
            onClick={fetchFootballScores} 
            style={{ 
              marginTop: '8px', 
              padding: '12px 32px', 
              fontSize: '1.1rem', 
              fontWeight: 600, 
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '30px', 
              boxShadow: '0 4px 15px rgba(238,90,36,0.3)', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              transform: 'translateY(0)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(238,90,36,0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(238,90,36,0.3)';
            }}
          >
            🔄 Refresh Scores
          </button>
        </div>
      </header>
      {/* Google AdSense */}
      <div style={{ margin: '24px auto 0 auto', maxWidth: '900px', padding: '0 16px' }}>
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
          data-ad-slot="1234567890"
          data-ad-format="auto"
        ></ins>
      </div>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 16px' }}>
        {/* Lineup selection UI */}
        <div className="lineup-selector" style={{ 
          marginBottom: '40px', 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(26,35,126,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h2 style={{ 
            fontSize: '1.4rem', 
            fontWeight: 700, 
            marginBottom: '20px', 
            color: '#1a237e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            📋 Team Lineups
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <label htmlFor="fixture-select" style={{ 
              fontWeight: 600, 
              fontSize: '1.1rem', 
              color: '#3949ab',
              minWidth: 'fit-content'
            }}>Select Match:</label>
            <select
              id="fixture-select"
              value={selectedFixture}
              onChange={e => setSelectedFixture(e.target.value)}
              style={{ 
                padding: '12px 20px', 
                fontSize: '1rem', 
                borderRadius: '12px', 
                border: '2px solid #e1f5fe', 
                minWidth: '200px',
                background: 'white',
                color: '#1a237e',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3949ab'}
              onBlur={(e) => e.target.style.borderColor = '#e1f5fe'}
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
              style={{ 
                padding: '12px 24px', 
                fontSize: '1rem', 
                fontWeight: 600, 
                background: selectedFixture ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)' : '#cccccc', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '12px', 
                cursor: selectedFixture ? 'pointer' : 'not-allowed', 
                boxShadow: selectedFixture ? '0 4px 15px rgba(76,175,80,0.3)' : 'none',
                transition: 'all 0.3s ease',
                minWidth: '140px'
              }}
            >
              📊 View Lineups
            </button>
          </div>
        </div>
        
        {/* League Filter Section */}
        <div style={{ 
          marginBottom: '30px', 
          textAlign: 'center',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(26,35,126,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h3 style={{ 
            fontSize: '1.2rem', 
            fontWeight: 700, 
            marginBottom: '16px', 
            color: '#1a237e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            🏆 Filter by League
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <label htmlFor="league-select" style={{ 
              fontWeight: 600, 
              fontSize: '1.1rem', 
              color: '#3949ab',
              minWidth: 'fit-content'
            }}>Select League:</label>
            <select
              id="league-select"
              value={selectedLeague || ''}
              onChange={e => setSelectedLeague(e.target.value || null)}
              disabled={leaguesLoading}
              style={{ 
                padding: '12px 20px', 
                fontSize: '1rem', 
                borderRadius: '12px', 
                border: '2px solid #e1f5fe', 
                minWidth: '200px',
                background: '#ffffff',
                color: '#333',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3949ab'}
              onBlur={(e) => e.target.style.borderColor = '#e1f5fe'}
            >
              <option value="">
                {leaguesLoading ? 'Loading leagues...' : 'All Leagues - Show All Live Matches'}
              </option>
              {leagues.map(league => (
                <option key={league.league.id} value={league.league.id}>
                  {league.league.name} ({league.country.name})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* ...existing code for matches... */}
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '80px', 
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(26,35,126,0.1)'
          }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '16px',
              animation: 'spin 2s linear infinite'
            }}>⚽</div>
            <div style={{ 
              color: '#3949ab', 
              fontSize: '1.3rem',
              fontWeight: 600
            }}>Loading live matches...</div>
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px', justifyContent: 'center' }}>
            {matches.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                fontSize: '1.2rem', 
                color: '#666', 
                gridColumn: '1/-1',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '20px',
                padding: '40px',
                boxShadow: '0 8px 32px rgba(26,35,126,0.1)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📺</div>
                <div>No live matches found at the moment.</div>
                <div style={{ fontSize: '1rem', color: '#999', marginTop: '8px' }}>Try refreshing to check for new matches</div>
              </div>
            ) : (
              matches.map(match => (
                <div key={match.fixture.id} className="match-card" style={{ 
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)', 
                  borderRadius: '24px', 
                  boxShadow: '0 8px 32px rgba(26,35,126,0.1)', 
                  padding: '28px 24px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  minHeight: '240px', 
                  transition: 'all 0.3s ease', 
                  border: '1px solid rgba(57,73,171,0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '0 24px 0 12px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                  }}>LIVE</div>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 700, 
                    color: '#3949ab', 
                    marginBottom: '16px', 
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #3949ab 0%, #5c6bc0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    padding: '8px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(57,73,171,0.05)'
                  }}>
                    🏆 {match.league.name}
                  </h3>
                  <div className="match-teams" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '20px', 
                    marginBottom: '20px', 
                    width: '100%'
                  }}>
                    <span style={{ 
                      fontWeight: 600, 
                      fontSize: '1.1rem', 
                      color: '#1a237e', 
                      flex: 1, 
                      textAlign: 'right',
                      padding: '12px',
                      background: 'rgba(26,35,126,0.05)',
                      borderRadius: '12px',
                      border: '2px solid rgba(26,35,126,0.1)'
                    }}>
                      {match.teams.home.name}
                    </span>
                    <div style={{
                      background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
                      borderRadius: '16px',
                      padding: '12px 20px',
                      boxShadow: '0 4px 15px rgba(26,35,126,0.2)'
                    }}>
                      <span style={{ 
                        fontWeight: 800, 
                        fontSize: '1.4rem', 
                        color: '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                      }}>
                        {match.goals.home} - {match.goals.away}
                      </span>
                    </div>
                    <span style={{ 
                      fontWeight: 600, 
                      fontSize: '1.1rem', 
                      color: '#1a237e', 
                      flex: 1, 
                      textAlign: 'left',
                      padding: '12px',
                      background: 'rgba(26,35,126,0.05)',
                      borderRadius: '12px',
                      border: '2px solid rgba(26,35,126,0.1)'
                    }}>
                      {match.teams.away.name}
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    width: '100%', 
                    fontSize: '0.95rem', 
                    color: '#666',
                    background: 'rgba(57,73,171,0.05)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    gap: '16px'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      🟢 <span style={{ fontWeight: 600, color: '#4caf50' }}>{match.fixture.status.long}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      🕐 {new Date(match.fixture.date).toLocaleString()}
                    </span>
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
        letterSpacing: '0.5px'
      }}>
        <div className="footer-flex" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
          <div className="footer-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', fontSize: '1.09rem', fontWeight: 600 }}>
            <span style={{ color: '#90caf9', fontSize: '1.13rem', fontWeight: 700 }}>Onatunde Samuel (Bsonat)</span>
            <span style={{ color: '#bbdefb', fontWeight: 500 }}>Contact: <a href="tel:08138873454" style={{ color: '#fff', textDecoration: 'none', marginRight: '8px' }}>08138873454</a> <a href="tel:08069311709" style={{ color: '#fff', textDecoration: 'none' }}>08069311709</a></span>
            <span style={{ color: '#bbdefb', fontWeight: 500 }}>Email: <a href="mailto:onatunde,samuel@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>onatunde,samuel@gmail.com</a></span>

          </div>
          <div className="footer-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', fontSize: '1.05rem', fontWeight: 500 }}>
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
          'x-apisports-key': '73757736d96873dd9bbf698666f28bdb'
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
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '0', margin: '0', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      {/* Responsive CSS for mobile view */}
      <style>{`
        @media (max-width: 700px) {
          header { padding: 24px 0 10px 0 !important; }
          main { padding: 18px 4px !important; }
          .footer-flex { flex-direction: column !important; align-items: flex-start !important; gap: 18px !important; }
          .footer-left, .footer-right { align-items: flex-start !important; text-align: left !important; font-size: 1rem !important; }
          .footer-left span, .footer-right span { font-size: 1rem !important; }
          .lineup-card { padding: 16px 12px !important; min-height: 200px !important; }
        }
        @media (max-width: 500px) {
          header h1 { font-size: 1.4rem !important; }
          button, select { font-size: 0.9rem !important; padding: 8px 16px !important; }
          .footer-left span, .footer-right span { font-size: 0.95rem !important; }
        }
      `}</style>
      <header style={{ 
        textAlign: 'center', 
        padding: '40px 20px 20px 20px', 
        background: 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)', 
        boxShadow: '0 4px 20px rgba(26,35,126,0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            margin: 0, 
            color: '#ffffff', 
            letterSpacing: '2px',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            marginBottom: '8px'
          }}>📋 TEAM LINEUPS</h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'rgba(255,255,255,0.9)', 
            margin: '0 0 24px 0',
            fontWeight: 400
          }}>Starting XI and substitutes information</p>
          <button 
            onClick={() => navigate('/')} 
            style={{ 
              marginTop: '8px', 
              padding: '12px 32px', 
              fontSize: '1.1rem', 
              fontWeight: 600, 
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '30px', 
              boxShadow: '0 4px 15px rgba(238,90,36,0.3)', 
              cursor: 'pointer', 
              transition: 'all 0.3s ease',
              transform: 'translateY(0)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(238,90,36,0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(238,90,36,0.3)';
            }}
          >
            ← Back to Scores
          </button>
        </div>
      </header>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 16px' }}>
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '80px', 
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(26,35,126,0.1)'
          }}>
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '16px',
              animation: 'spin 2s linear infinite'
            }}>📋</div>
            <div style={{ 
              color: '#3949ab', 
              fontSize: '1.3rem',
              fontWeight: 600
            }}>Loading team lineups...</div>
          </div>
        ) : error ? (
          <div style={{ 
            textAlign: 'center', 
            fontSize: '1.2rem', 
            color: '#e53e3e', 
            marginTop: '40px',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(229,62,62,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>❌</div>
            <div>{error}</div>
          </div>
        ) : lineups.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            fontSize: '1.2rem', 
            color: '#666', 
            marginTop: '40px',
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(26,35,126,0.1)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
            <div>No lineup data found for this fixture.</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', justifyContent: 'center', marginBottom: '40px' }}>
            {lineups.map((lineup, idx) => (
              <div key={lineup.team.id || idx} className="lineup-card" style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)', 
                borderRadius: '24px', 
                boxShadow: '0 8px 32px rgba(26,35,126,0.1)', 
                padding: '28px 24px', 
                minHeight: '240px', 
                border: '1px solid rgba(57,73,171,0.1)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 700, 
                    color: '#3949ab', 
                    marginBottom: '12px',
                    background: 'linear-gradient(135deg, #3949ab 0%, #5c6bc0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    🏟️ {lineup.team.name}
                  </h3>
                  {lineup.team.logo && (
                    <img 
                      src={lineup.team.logo} 
                      alt={lineup.team.name} 
                      style={{ 
                        width: '64px', 
                        height: '64px',
                        borderRadius: '50%',
                        border: '3px solid rgba(57,73,171,0.1)',
                        boxShadow: '0 4px 15px rgba(26,35,126,0.1)'
                      }} 
                    />
                  )}
                </div>
                
                <div style={{ 
                  marginBottom: '16px', 
                  fontWeight: 600,
                  color: '#1a237e',
                  background: 'rgba(57,73,171,0.05)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  👨‍💼 Coach: {lineup.coach && lineup.coach.name}
                </div>
                
                <div style={{ 
                  marginBottom: '16px',
                  background: 'rgba(76,175,80,0.05)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(76,175,80,0.2)'
                }}>
                  <strong style={{ color: '#4caf50', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ⚽ Formation: {lineup.formation}
                  </strong>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <strong style={{ 
                    color: '#3949ab', 
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    🟢 Starting XI:
                  </strong>
                  <ul style={{ 
                    paddingLeft: '0', 
                    margin: 0,
                    listStyle: 'none'
                  }}>
                    {lineup.startXI && lineup.startXI.map((player, i) => (
                      <li key={player.player.id || i} style={{ 
                        marginBottom: '6px',
                        padding: '8px 12px',
                        background: 'rgba(76,175,80,0.05)',
                        borderRadius: '8px',
                        border: '1px solid rgba(76,175,80,0.1)',
                        fontSize: '0.95rem'
                      }}>
                        <strong>{player.player.name}</strong> 
                        <span style={{ color: '#666', fontSize: '0.9rem' }}>
                          {' '}#{player.player.number} ({player.player.pos})
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div style={{ marginBottom: '8px' }}>
                  <strong style={{ 
                    color: '#ff9800', 
                    fontSize: '1.1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    🔄 Substitutes:
                  </strong>
                  <ul style={{ 
                    paddingLeft: '0', 
                    margin: 0,
                    listStyle: 'none'
                  }}>
                    {lineup.substitutes && lineup.substitutes.map((player, i) => (
                      <li key={player.player.id || i} style={{ 
                        marginBottom: '6px',
                        padding: '8px 12px',
                        background: 'rgba(255,152,0,0.05)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255,152,0,0.1)',
                        fontSize: '0.95rem'
                      }}>
                        <strong>{player.player.name}</strong> 
                        <span style={{ color: '#666', fontSize: '0.9rem' }}>
                          {' '}#{player.player.number} ({player.player.pos})
                        </span>
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
        letterSpacing: '0.5px'
      }}>
        <div className="footer-flex" style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
          <div className="footer-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', fontSize: '1.09rem', fontWeight: 600 }}>
            <span style={{ color: '#90caf9', fontSize: '1.13rem', fontWeight: 700 }}>Onatunde Samuel (Bsonat)</span>
            <span style={{ color: '#bbdefb', fontWeight: 500 }}>Contact: <a href="tel:08138873454" style={{ color: '#fff', textDecoration: 'none', marginRight: '8px' }}>08138873454</a> <a href="tel:08069311709" style={{ color: '#fff', textDecoration: 'none' }}>08069311709</a></span>
            <span style={{ color: '#bbdefb', fontWeight: 500 }}>Email: <a href="mailto:onatunde,samuel@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>onatunde,samuel@gmail.com</a></span>

          </div>
          <div className="footer-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', fontSize: '1.05rem', fontWeight: 500 }}>
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
