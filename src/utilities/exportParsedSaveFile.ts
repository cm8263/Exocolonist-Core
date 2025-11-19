import { RawSaveFile } from '../types/interface/rawSaveFile';
import { ParsedSaveFile } from '../types/interface/parsedSaveFile';
import {
	stringifyGroundHogs,
	stringifyLove,
	stringifyMapSpots,
	stringifyMemories,
	stringifySeenChoices,
	stringifySkills,
	stringifyStatus,
	stringifyStories,
	stringifyStoryLogs,
	stringifyYearStats,
} from '../index.js';

export const exportParsedSaveFile = (parsedSaveFile: ParsedSaveFile) => {
	// The order here isn't important other than it matches how the save order of the game
	const rawSaveFile: RawSaveFile = {
		saveFileVersion: parsedSaveFile.fileVersion,
		week: parsedSaveFile.week,
		expeditionJobID: parsedSaveFile.expeditionJobId,
		secondsPlayed: parsedSaveFile.playTime,
		mapCoords: parsedSaveFile.mapCoords,
		mapName: parsedSaveFile.mapName,
		mapSpotsByMapSerialized: stringifyMapSpots(parsedSaveFile.mapSpotsByMap),
		princessName: parsedSaveFile.playerName,
		genderPronounsFloat: parsedSaveFile.pronouns,
		genderAppearanceFloat: parsedSaveFile.appearance,
		skillsSerialized: stringifySkills(parsedSaveFile.skills),
		memoriesSerialized: stringifyMemories(parsedSaveFile.memories),
		loveSerialized: stringifyLove(parsedSaveFile.love),
		statusesSerialized: stringifyStatus(parsedSaveFile.statuses),
		storiesSerialized: stringifyStories(parsedSaveFile.stories),
		storiesLogSerialized: stringifyStoryLogs(parsedSaveFile.storyLog),
		yearStatsSerialized: stringifyYearStats(parsedSaveFile.yearsStats),
		// TODO:
		customGenderSerialized: '',
		seenTutorials: parsedSaveFile.seenTutorials,
		cards: parsedSaveFile.cards,
		equippedGear: parsedSaveFile.gear,
		lastJobScores: parsedSaveFile.jobScores,
		lastJobGoal: parsedSaveFile.jobGoal,
		lastHardJobWins: parsedSaveFile.hardJobWins,
		groundhogsSerialized: stringifyGroundHogs(parsedSaveFile.groundhogs),
		seenChoicesSerialized: stringifySeenChoices(parsedSaveFile.seenChoices),
		seenBackgrounds: parsedSaveFile.seenBackgrounds,
		seenCards: parsedSaveFile.seenCards,
		cheevos: parsedSaveFile.cheevos,
	};

	// Pretty-print to match the autosave JSON style
	return JSON.stringify(rawSaveFile, null, 4);
};
