import { MapCoords } from './mapCoords';

export interface RawSaveFile {
	saveFileVersion: number;
	week: number;
	expeditionJobID: string;
	secondsPlayed: number;
	mapCoords: MapCoords;
	mapName: string;
	mapSpotsByMapSerialized: string;
	princessName: string;
	genderPronounsFloat: number;
	genderAppearanceFloat: number;
	skillsSerialized: string;
	memoriesSerialized: string;
	loveSerialized: string;
	statusesSerialized: string;
	storiesSerialized: string;
	storiesLogSerialized: string;
	yearStatsSerialized: string;
	customGenderSerialized: string;
	seenTutorials: string[];
	cards: string[];
	equippedGear: string[];
	lastJobScores: number[];
	lastJobGoal: number[];
	lastHardJobWins: boolean[];
	groundhogsSerialized: string;
	seenChoicesSerialized: string;
	seenBackgrounds: string[];
	seenCards: string[];
	cheevos: number[];
}
