import styled from "styled-components";
import { useRecoilValue } from "recoil";
import {
  SelectedStateAtom,
  SelectedStateAtomType,
} from "../../atoms/selectedState";
import { Map } from "../../components/Map";
import { PlaceDetail } from "../../components/place/detail";
import { PlaceList } from "../../components/place/list";
import { useRef } from "react";
import { PlaceAdd } from "../../components/place/add";

export const MapPage = () => {
  const selectedState =
    useRecoilValue<SelectedStateAtomType>(SelectedStateAtom);
  const isSelectedSet = selectedState.id !== 0;
  const isAddingFireHydrant = selectedState.id === -1;
  const listRef = useRef<HTMLUListElement>(null);
  return (
    <Wrapper>
      <Map />
      {isAddingFireHydrant ? (
        <PlaceAdd />
      ) : isSelectedSet ? (
        <PlaceDetail />
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

  width: 100vw;
  height: calc(100vh - 16px);

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;
`;
