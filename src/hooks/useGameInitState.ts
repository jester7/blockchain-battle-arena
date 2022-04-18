import { useState, useCallback } from "react";
import { GameCharacter } from "../game/Game";


export function useGameInitState() {
    const [characterNum, setCharacterNum] = useState(1);
    const [mechColor, setMechColor] = useState("red");
    const [gunName, setGunName] = useState("biggun");

    const getCharacterNum = useCallback(() => {
        return characterNum;
    },[characterNum]);

    const getMechColor = useCallback(() => {
        return mechColor;
    },[mechColor]);


    const getGunName = useCallback(() => {
        return gunName;
    },[gunName]);

    const updateCharacterNum = useCallback((characterNum: number) => {
        setCharacterNum(characterNum);
    },[]);

    const updateMechColor = useCallback((mechColor: string) => {
        setMechColor(mechColor);
    },[]);

    const updateGunName = useCallback((gunName: string) => {
        setGunName(gunName);
    },[]);

    const getGameCharacter = useCallback(():GameCharacter => {
        return {characterNum, mechColor, gunName};
    },[characterNum, mechColor, gunName]);

    return {
        getCharacterNum,
        getMechColor,
        getGunName,
        updateCharacterNum,
        updateMechColor,
        updateGunName,
        getGameCharacter
    }
}

