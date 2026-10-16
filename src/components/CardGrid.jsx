import Card from './Card'

function CardGrid({ stands, onCardClick }) {
  return (
    <div className="card-grid">
      {stands.map((stand) => (
        <Card key={stand.id} stand={stand} onCardClick={onCardClick} />
      ))}
    </div>
  )
}

export default CardGrid
