import { useEffect, useState } from "react";
import { getEvents } from "../api/event.api";
import EventCard from "../components/EventCard";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((res) => setEvents(res.data));
  }, []);

  return (
    <div>
      <h1>🎫 Danh sách sự kiện</h1>
      {events.map((e) => (
        <EventCard key={e._id} event={e} />
      ))}
    </div>
  );
}

export default Events;
