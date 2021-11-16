import { useState } from "react";
import Image from "next/image";
import { getPlacesByTags, defaultTagField } from "../utilities";
import { TagRadioGroup, PlaceCard } from "../components";
import PlacePickerSection from "./styles/PlacePicker";
import { Button } from "./styles/AuthFormStyles";

const PlacePicker = () => {
  const [tagsToQuery, setTagsToQuery] = useState(defaultTagField);
  const [showError, setShowError] = useState(false);
  const [showClearButton, setShowClearButton] = useState(false);
  const [destination, setDestination] = useState(null);
  const [destinationLoading, setDestinationLoading] = useState(false);

  const handleChange = (e) => {
    setShowError(false);
    setShowClearButton(true);
    setTagsToQuery((tagsToQuery) => {
      const { name, value } = e.target;
      return { ...tagsToQuery, [name]: value.substr(4) };
    });
  };

  const queryPlaces = async () => {
    try {
      setShowError(false);
      setDestinationLoading(true);
      setDestination(null);

      const places = await getPlacesByTags(tagsToQuery);

      if (!places.length) {
        console.warn("No places returned");
        setTimeout(() => {
          setShowError(true);
          setDestinationLoading(false);
          setDestination(null);
        }, 1000);
        return;
      }

      const placeToGo = places[Math.floor(Math.random() * places.length)];

      setTimeout(() => {
        setDestinationLoading(false);
        setDestination(placeToGo);
      }, 4000);
    } catch (e) {
      console.error(e);
    }
  };

  const clearFilters = () => {
    const filters = document.querySelectorAll('input[type="radio"]');
    const checkedFilters = Array.from(filters).filter((input) => input.checked);
    checkedFilters.forEach((input) => (input.checked = false));
    setTagsToQuery(defaultTagField);
  };

  return (
    <PlacePickerSection>
      <div className="col-4">
        <h2>Travel pick for the year...</h2>

        <TagRadioGroup handleChange={handleChange} />

        <Button onClick={queryPlaces}>Show match</Button>

        {showClearButton && (
          <Button onClick={clearFilters}>Clear Filters</Button>
        )}
      </div>
      <div className="col-6">
        {destination ? (
          <PlaceCard place={destination} />
        ) : showError ? (
          <div className="no-match">
            <span>Sorry, no destinations matched those tags </span>
          </div>
        ) : destinationLoading ? (
          <Image
            src="/globe-revolution.gif"
            alt="spinning globe"
            width={100}
            height={80}
            layout="responsive"
            objectFit="contain"
            objectPosition="center"
          />
        ) : (
          <Image
            src="/globe.jpg"
            alt="globe"
            width={250}
            height={180}
            layout="responsive"
            objectFit="cover"
            objectPosition="center"
          />
        )}
      </div>
    </PlacePickerSection>
  );
};

export default PlacePicker;
