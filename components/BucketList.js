import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, snapshotToArray, getUnvisitedPlaces } from "../utilities";
import { Container, Grid } from "./styles/DestinationStyles";
import { PlaceCard } from "../components";

const BucketList = () => {
  const [places, setPlaces] = useState([]);

  const fetchData = async () => {
    try {
      const placesArray = await getUnvisitedPlaces();
      setPlaces(placesArray);
    } catch (e) {
      console.error("📣: fetchData -> e", e);
    }
  };

  useEffect(() => {
    fetchData();
    const q = query(collection(db, "places"), where("visited", "==", "No"));
    onSnapshot(q, (querySnapshot) => {
      const placesArray = snapshotToArray(querySnapshot);
      setPlaces(placesArray);
    });
  }, []);

  return (
    <Container>
      <h2>Bucket List Destinations</h2>
      {places.length ? (
        <Grid>
          {places.map((place, i) => (
            <PlaceCard key={i} place={place} />
          ))}
        </Grid>
      ) : (
        <p>Add some places you want to go!</p>
      )}
    </Container>
  );
};

export default BucketList;
