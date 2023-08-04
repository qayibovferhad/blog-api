import React from "react";
import { useParams } from "react-router-dom";

function Inbox() {
  const { userId } = useParams();
  return <h1>Say hello to {userId}</h1>;
}
export default Inbox;
