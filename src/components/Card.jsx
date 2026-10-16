function Card({ stand, onCardClick }) {
  return (
    <button className="card" onClick={() => (onCardClick(stand.id))}>
      <img src={stand.image} alt={stand.name} />
      <span className="card-name">{stand.name}</span>
    </button>
  )
}

export default Card
