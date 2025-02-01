import React from "react";

import AddEvent from "@/components/AddEvent";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchEvents = async () => {
  try {
    const res = await axios.get("http://localhost:5000/events/get");
    console.log("events fetched", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const Home = () => {
  const queryClient = useQueryClient();
  const {
    data: events,
    isPending,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const handleEventAdded = () => {
    queryClient.invalidateQueries({ queryKey: ["events"] });
  };

  if (isPending) return "Loading...";

  return (
    <div>
      <AddEvent onEventAdded={handleEventAdded} />
      <h1>Home</h1>

      {events?.map((event) => (
        <div key={event.event_id}>
          <table className="border w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{event.title}</td>
                <td>{event.description}</td>
                <td>{event.start_date}</td>
                <td>{event.end_date}</td>
                <td>{event.created}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Home;
