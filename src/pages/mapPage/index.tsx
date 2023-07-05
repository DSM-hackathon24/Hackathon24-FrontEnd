import styled from "styled-components";
import { useRecoilValue } from "recoil";
import {
  SelectedStateAtom,
  SelectedStateAtomType,
} from "../../atoms/selectedState";
import { PlaceStateAtom } from "../../atoms/placeState";
import { Map } from "../../components/Map";
import { PlaceDetail } from "../../components/place/detail";
import { SearchInput } from "../../components/SearchInput";
import { PlaceList } from "../../components/place/list";
import { useRef } from "react";
import { PlaceResponseType } from "../../types/place/response";
import { PlaceAdd } from "../../components/place/add";

export const MapPage = () => {
  const selectedState =
    useRecoilValue<SelectedStateAtomType>(SelectedStateAtom);
  const placeState = useRecoilValue<PlaceResponseType[]>(PlaceStateAtom);
  const isSelectedSet = selectedState.id !== 0;
  const isAddingFireHydrant = selectedState.id === -1;
  const listRef = useRef<HTMLUListElement>(null);
  return (
    <Wrapper>
      <Map />
      {isAddingFireHydrant ? (
        <PlaceAdd />
      ) : isSelectedSet ? (
        <PlaceDetail
          place={placeState.filter((v) => v.id == selectedState.id)[0]}
        />
      ) : (
        <PlaceList listRef={listRef} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  padding-left: 5vw;
  padding-right: 5vw;
  margin-top: 16px;
  margin-bottom: 70px;

  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
