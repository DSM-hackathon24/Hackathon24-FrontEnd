import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  SelectedStateAtom,
  SelectedStateAtomType,
} from "../../atoms/selectedState";
import { PlaceStateAtom } from "../../atoms/placeState";
import { dummyPlaces } from "../../libs/constants/dummyPlaces";
import { ToggleMenu } from "../ToggleMenu";
import { PlaceResponseType } from "../../types/place/response";
import {
  ClickLocationStateAtom,
  ClickLocationStateAtomType,
} from "../../atoms/clickLocationState";

export const Map = () => {
  const setPlaceState = useSetRecoilState<PlaceResponseType[]>(PlaceStateAtom);
  const setClickLocationState = useSetRecoilState<ClickLocationStateAtomType>(
    ClickLocationStateAtom
  );
  const [selected, setSelectedState] =
    useRecoilState<SelectedStateAtomType>(SelectedStateAtom);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const isRendered = useRef<boolean>(false);
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setClickLocationState({ x: undefined, y: undefined });
    if (map && selected.id && selected.id !== -1) {
      const latLng = new kakao.maps.LatLng(selected.x, selected.y);
      map.setCenter(latLng);
    }
  }, [selected]);
  useEffect(() => {
    if (map === null && mapRef.current) {
      const initMap = (position: GeolocationPosition) => {
        if (!isRendered.current && mapRef.current) {
          isRendered.current = true;
          const markerImageUrl =
            "https://cdn.discordapp.com/attachments/1077850822341300244/1125704829239558164/markers.webp";
          const newMap = new kakao.maps.Map(mapRef.current, {
            center: new kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            level: 4,
          });
          kakao.maps.event.addListener(
            newMap,
            "click",
            (mouseEvent: kakao.maps.event.MouseEvent) => {
              const latLng = mouseEvent.latLng;
              setClickLocationState({ x: latLng.getLat(), y: latLng.getLng() });
            }
          );
          const userMarker = new kakao.maps.MarkerImage(
            markerImageUrl,
            new kakao.maps.Size(16, 16),
            {
              spriteOrigin: new kakao.maps.Point(0, 0),
              spriteSize: new kakao.maps.Size(16, 32),
            }
          );
          const adminMarker = new kakao.maps.MarkerImage(
            markerImageUrl,
            new kakao.maps.Size(16, 16),
            {
              spriteOrigin: new kakao.maps.Point(0, 16),
              spriteSize: new kakao.maps.Size(16, 32),
            }
          );
          const center = newMap.getCenter();
          const initMarker = (place: PlaceResponseType) => {
            const p1 = new kakao.maps.LatLng(place.x, place.y);
            const poly = new kakao.maps.Polyline({ path: [p1, center] });
            const distance = poly.getLength() / 1000;
            setPlaceState((prevState) => {
              return [
                ...prevState,
                {
                  id: place.id,
                  foundBy: place.foundBy,
                  foundDate: place.foundDate,
                  type: place.type,
                  available: place.available,
                  year: place.year,
                  distance: distance,
                  x: place.x,
                  y: place.y,
                },
              ];
            });
            const isFoundByAdmin = place.foundBy === undefined;
            const marker = new kakao.maps.Marker({
              map: newMap,
              position: p1,
              image: isFoundByAdmin ? adminMarker : userMarker,
            });
            kakao.maps.event.addListener(marker, "click", () =>
              setSelectedState({
                id: place.id,
                x: place.x,
                y: place.y,
              })
            );
          };
          dummyPlaces.forEach((v) => initMarker(v));
          setMap(newMap);
        }
      };
      if (navigator.geolocation) navigator.geolocation.watchPosition(initMap);
    }
  }, [mapRef.current]);
  return (
    <Wrapper id="map" ref={mapRef}>
      권한을 기다리는 중...
      {map && <ToggleMenu />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  width: 90vw;
  min-height: 400px;

  ${({ theme }) => theme.commons.boxShadow}
`;
