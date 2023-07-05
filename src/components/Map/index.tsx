import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  SelectedStateAtom,
  SelectedStateAtomType,
} from "../../atoms/selectedState";
import { PlaceStateAtom } from "../../atoms/placeState";
import { ToggleMenu } from "../ToggleMenu";
import {
  ClickLocationStateAtom,
  ClickLocationStateAtomType,
} from "../../atoms/clickLocationState";
import { MapLoadListResponseType } from "../../types/map/loadList/response";
import { HydrantImg } from "../../assets/images";

export const Map = () => {
  const [placeState, setPlaceState] =
    useRecoilState<MapLoadListResponseType[]>(PlaceStateAtom);
  const setClickLocationState = useSetRecoilState<ClickLocationStateAtomType>(
    ClickLocationStateAtom
  );
  const [selected, setSelectedState] =
    useRecoilState<SelectedStateAtomType>(SelectedStateAtom);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const isRendered = useRef<boolean>(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const hasPlaceState = placeState.length > 0;
  useEffect(() => {
    setClickLocationState({ x: undefined, y: undefined });
    if (map && selected.id && selected.id !== -1) {
      const latLng = new kakao.maps.LatLng(selected.x, selected.y);
      map.setCenter(latLng);
    }
  }, [selected]);
  useEffect(() => {
    if (map === null && mapRef.current && hasPlaceState) {
      const initMap = (position: GeolocationPosition) => {
        if (!isRendered.current && mapRef.current) {
          isRendered.current = true;
          const markerImageUrl =
            "https://media.discordapp.net/attachments/1077850822341300244/1126208341811679332/Group_6997.webp";
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
              spriteSize: new kakao.maps.Size(32, 64),
            }
          );
          const adminMarker = new kakao.maps.MarkerImage(
            markerImageUrl,
            new kakao.maps.Size(16, 16),
            {
              spriteOrigin: new kakao.maps.Point(0, 16),
              spriteSize: new kakao.maps.Size(32, 64),
            }
          );
          const centerMarker = new kakao.maps.MarkerImage(
            markerImageUrl,
            new kakao.maps.Size(32, 32),
            {
              spriteOrigin: new kakao.maps.Point(0, 32),
              spriteSize: new kakao.maps.Size(32, 64),
            }
          );
          const center = newMap.getCenter();
          new kakao.maps.Marker({
            map: newMap,
            position: center,
            image: centerMarker,
          });
          const initMarker = (place: MapLoadListResponseType) => {
            const p1 = new kakao.maps.LatLng(place.latitude, place.longitude);
            const poly = new kakao.maps.Polyline({ path: [p1, center] });
            const distance = poly.getLength() / 1000;
            const isFoundByAdmin = !place.writer;
            const marker = new kakao.maps.Marker({
              map: newMap,
              position: p1,
              image: isFoundByAdmin ? adminMarker : userMarker,
            });
            kakao.maps.event.addListener(marker, "click", () =>
              setSelectedState({
                id: place.mapId,
                x: place.latitude,
                y: place.longitude,
              })
            );
            return {
              mapId: place.mapId,
              latitude: place.latitude,
              longitude: place.longitude,
              sortation: place.sortation,
              writer: place.writer,
              distance: distance,
            };
          };
          setPlaceState(placeState.map((v) => initMarker(v)));
          setMap(newMap);
        }
      };
      if (navigator.geolocation) navigator.geolocation.watchPosition(initMap);
    }
  }, [mapRef.current, hasPlaceState]);
  return (
    <Wrapper ref={mapRef}>
      권한을 기다리는 중...
      {map && (
        <ToggleMenu>
          <li>
            <button
              aria-label="소화전 추가"
              type="button"
              onClick={() => {
                setSelectedState({ id: -1, x: 0, y: 0 });
              }}
            >
              <figure>
                <picture>
                  <source type="image/svg+xml" srcSet={HydrantImg} />
                  <img alt="" width="24" height="24" />
                </picture>
                <figcaption>소화전 추가</figcaption>
              </figure>
            </button>
          </li>
        </ToggleMenu>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  width: 90vw;
  min-height: 400px;

  ${({ theme }) => theme.commons.boxShadow}
`;
