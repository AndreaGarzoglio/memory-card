import Scoreboard from './components/Scoreboard'
import CardGrid from './components/CardGrid'
import './App.css'
import logo from './assets/logo-golden-wind.png'
import { useState, useEffect } from 'react'
const VISIBLE_COUNT = 10
const API_URL = "https://jojowiki.com/api.php?action=query&generator=categorymembers&gcmtitle=Category:Part_5_Stands&gcmnamespace=0&gcmlimit=500&prop=pageimages&pithumbsize=300&format=json&origin=*"


function App() {
  const [stands, setStands] = useState([])
  const [visibleStands, setVisibleStands] = useState([])
  const [clickedIds, setClickedIds] = useState([])
  const [hasWon, setHasWon] = useState(false)

  const [bestScore, setBestScore] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const score = clickedIds.length;


  const handleCardClick = (id) => {
    let nextClicked;
    if (clickedIds.includes(id)) {
      if (score > bestScore) { setBestScore(score); }
      nextClicked = [];
    } else {
      nextClicked = [...clickedIds, id];
      if (nextClicked.length === stands.length) {
        setBestScore(nextClicked.length);
        setHasWon(true);
      }
    }
    setClickedIds(nextClicked);
    setVisibleStands(pickVisible(stands, nextClicked));
  }

  const restart = () => {
    setClickedIds([]);
    setHasWon(false);
    setVisibleStands(pickVisible(stands, []));
  }

  useEffect(() => {
    let ignore = false;

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (ignore) return;
        const pages = Object.values(data.query.pages)
        const cards = pages.filter((page) => page.title !== "List of Unnamed Stands" && !page.title.includes("/pl")).map((page) => ({
          id: page.pageid,
          name: page.title,
          image: page.thumbnail?.source
        }))

        setStands(cards);
        setVisibleStands(pickVisible(cards, []));
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      })

    return () => {
      ignore = true;
    }
  }, [])

  return (
    <>
      <header className="header">
        <img className="logo" src={logo} alt="JoJo's Bizarre Adventure: Golden Wind" />
        <h1>
          <Menacing />
          Stand Memory
          <Menacing />
        </h1>
        <p className="rules">Click each Stand only once. Pick the same one twice and you start over!</p>
      </header>
      <main>
        {isLoading && <p className="status">Summoning Stands...</p>}
        {error && <p className="status">Failed to load Stands: {error}</p>}
        {!isLoading && !error && (
          <CardGrid stands={visibleStands} onCardClick={handleCardClick} />
        )}
        <Scoreboard score={score} bestScore={bestScore} total={stands.length} />
      </main>

      {hasWon && (
        <div className="overlay">
          <div className="victory">
            <h2>Arrivederci!</h2>
            <p>You found every Stand: {stands.length}/{stands.length}</p>
            <button className="restart" onClick={restart}>Play again</button>
          </div>
        </div>
      )}
    </>
  )
}

// I "ゴゴゴ" minacciosi ai lati del titolo
function Menacing() {
  return (
    <span className="menacing" aria-hidden="true">
      <span>ゴ</span><span>ゴ</span><span>ゴ</span><span>ゴ</span><span>ゴ</span>
    </span>
  )
}

// Pesca VISIBLE_COUNT stand a caso, garantendo che almeno uno
// non sia ancora stato cliccato (altrimenti il giocatore perderebbe per forza)
function pickVisible(all, clickedIds) {
  const picked = shuffle(all).slice(0, VISIBLE_COUNT);
  const hasUnclicked = picked.some((s) => !clickedIds.includes(s.id));
  if (!hasUnclicked) {
    const unclicked = all.filter((s) => !clickedIds.includes(s.id));
    if (unclicked.length > 0) {
      const randomUnclicked = unclicked[Math.floor(Math.random() * unclicked.length)];
      picked[Math.floor(Math.random() * picked.length)] = randomUnclicked;
    }
  }
  return picked;
}

function shuffle(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i >= 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}


export default App
