import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, snapshotToArray, getVisitedPlaces } from "../utilities";
import { Container, Grid } from "./styles/DestinationStyles";
import { PlaceCard } from "../components";

const VisitedPlaces = () => {
  const [places, setPlaces] = useState([]);

  const fetchData = async () => {
    try {
      const placesArray = await getVisitedPlaces();
      setPlaces(placesArray);
    } catch (e) {
      console.error("📣: fetchData -> e", e);
    }
  };

  useEffect(() => {
    fetchData();
    const q = query(collection(db, "places"), where("visited", "==", "Yes"));
    onSnapshot(q, (querySnapshot) => {
      const placesArray = snapshotToArray(querySnapshot);
      setPlaces(placesArray);
    });
  }, []);

  return (
    <Container>
      <h2>Places we&apos;ve been</h2>
      {places.length ? (
        <Grid>
          {places.map((place, i) => (
            <PlaceCard key={i} place={place} />
          ))}
        </Grid>
      ) : (
        <p>Haven&apos;t been anywhere yet...</p>
      )}
    </Container>
  );
};

export default VisitedPlaces;
