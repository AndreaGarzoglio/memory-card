function Scoreboard({ score, bestScore, total }) {
  return (
    <div className="scoreboard">
      <p>Score <span>{score}/{total}</span></p>
      <p>Best <span>{bestScore}/{total}</span></p>
    </div>
  )
}

export default Scoreboard
