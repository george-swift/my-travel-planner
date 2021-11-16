import EventBus from "./EventBus";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "travel-hunter-694e6.firebaseapp.com",
  databaseURL: "https://travel-hunter-694e6.firebaseio.com",
  projectId: "travel-hunter-694e6",
  storageBucket: "travel-hunter-694e6.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const snapshotToArray = (querySnapshot) => {
  if (!querySnapshot.docs && !querySnapshot.docs.length)
    throw new Error("No docs!");

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const placesRef = collection(db, "places");

const getUnvisitedPlaces = async () => {
  try {
    const q = query(placesRef, where("visited", "==", "No"));
    const querySnapshot = await getDocs(q);
    const placesArray = snapshotToArray(querySnapshot);
    return placesArray;
  } catch (e) {
    console.error("📣: fetchData -> e", e);
  }
};

const getVisitedPlaces = async () => {
  try {
    const q = query(placesRef, where("visited", "==", "Yes"));
    const querySnapshot = await getDocs(q);
    const placesArray = snapshotToArray(querySnapshot);
    return placesArray;
  } catch (e) {
    console.error("📣: fetchData -> e", e);
  }
};

const slugify = (str) => {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const addPlace = async (place) => {
  try {
    await setDoc(
      doc(db, "places", place.id ? place.id : slugify(place.name)),
      place
    );
  } catch (e) {
    console.error("📣: addPlace -> e", e);
  }
};

const deletePlace = async (place) => {
  try {
    await deleteDoc(doc(db, "places", place.id));
  } catch (e) {
    console.error("📣: deletePlace -> e", e);
  }
};

const defaultTags = {
  type: {
    adventure: false,
    beach: false,
    city: false,
    resort: false,
  },
  temperature: {
    hot: false,
    cold: false,
    temperate: false,
  },
  flight: {
    long: false,
    medium: false,
    short: false,
  },
};

const defaultTagField = {
  type: "",
  temperature: "",
  flight: "",
};

const defaultPlace = {
  name: "",
  description: "",
  img: "",
  visited: "No",
  visitedDate: "",
  tags: defaultTagField,
};

const getPlacesByTags = async (tagsToQuery) => {
  try {
    let q = query(placesRef, where("visited", "==", "No"));

    for (const key in tagsToQuery) {
      const value = tagsToQuery[key];
      if (value) {
        q = query(
          placesRef,
          where("visited", "==", "No"),
          where(`tags.${key}`, "==", value)
        );
      }
    }

    const querySnapshot = await getDocs(q);
    const places = snapshotToArray(querySnapshot);
    return places;
  } catch (e) {
    console.error("📣: getPlacesByTags -> e", e);
  }
};

const login = async ({ email, password }) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    const { code, message } = e;
    console.error("📣: login -> error", code, message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (e) {
    const { code, message } = e;
    console.error("📣: logout -> error", code, message);
  }
};

export {
  EventBus,
  db,
  auth,
  login,
  logout,
  snapshotToArray,
  defaultTags,
  defaultTagField,
  defaultPlace,
  addPlace,
  deletePlace,
  getPlacesByTags,
  getUnvisitedPlaces,
  getVisitedPlaces,
};
