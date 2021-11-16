import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { EventBus, defaultPlace, auth, logout } from "../utilities";
import {
  Head,
  Nav,
  AuthForm,
  BucketList,
  VisitedPlaces,
  PlaceForm,
  PlacePicker,
} from "../components";
import styles from "../styles/wrapper.module.css";

export default function Home() {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [authModalShown, setAuthModalShown] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [placeToEdit, setPlaceToEdit] = useState(defaultPlace);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setAuthed(!!user));
  }, []);

  const openModal = (place = defaultPlace) => {
    setPlaceToEdit(place);
    setIsModalShown(true);
  };

  const closeModal = () => setIsModalShown(false);

  EventBus.on("addPlace", () => {
    if (authed) {
      setIsEditing(false);
      openModal();
      setAuthModalShown(false);
    } else {
      setAuthModalShown(true);
    }
  });

  EventBus.on("editPlace", (place) => {
    setIsEditing(true);
    openModal(place);
  });

  EventBus.on("login", () => {
    closeModal();
    setAuthModalShown(true);
  });

  EventBus.on("closePlaceModal", () => closeModal());
  EventBus.on("closeAuthModal", () => setAuthModalShown(false));
  EventBus.on("logout", async () => await logout());

  return (
    <div>
      <Head title="Travel hunter" />

      <Nav authed={authed} />

      <div className={styles.container}>
        {authModalShown && <AuthForm />}

        {isModalShown && (
          <PlaceForm
            isEditing={isEditing}
            placeToEdit={placeToEdit}
            authed={authed}
          />
        )}

        <PlacePicker />

        <BucketList />

        <VisitedPlaces />
      </div>
    </div>
  );
}
