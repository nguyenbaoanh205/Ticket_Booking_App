import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div>
      <h3>{event.title}</h3>
      <p>{event.location}</p>
      <Link to={`/events/${event._id}`}>Xem chi tiết</Link>
    </div>
  );
}

export default EventCard;
