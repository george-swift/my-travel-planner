import PropTypes from "prop-types";
import { EventBus } from "../utilities";
import { Tag } from "../components";
import { Card, Figure, Content } from "./styles/PlaceCardStyles";

const PlaceCard = ({ place }) => {
  const editPlace = () => EventBus.emit("editPlace", place);

  return (
    <Card onClick={editPlace} role="button" tabIndex="0">
      {place.img && (
        <Figure>
          <img src={place.img} alt={place.name} />
        </Figure>
      )}
      <Content>
        <h3>{place.name}</h3>
        {place.description && (
          <p className="description">{place.description}</p>
        )}
        {place.visited === "Yes" && place.visitedDate && (
          <small>
            <b>Visited:</b>&nbsp;
            {place.visitedDate}
          </small>
        )}
        <div>
          {place.tags &&
            Object.keys(place.tags).map(
              (category, i) =>
                place.tags[category] && (
                  <Tag
                    key={i}
                    tag={place.tags[category]}
                    isFlight={category === "flight"}
                  />
                )
            )}
        </div>
      </Content>
    </Card>
  );
};

PlaceCard.propTypes = {
  place: PropTypes.object.isRequired,
};

export default PlaceCard;
