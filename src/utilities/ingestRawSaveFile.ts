import { RawSaveFile } from '../types/interface/rawSaveFile';
import { ParsedSaveFile } from '../types/interface/parsedSaveFile';
import {
	parseCustomGenderStrings,
	parseGroundHogs,
	parseLove,
	parseMapSpots,
	parseMemories,
	parseSeenChoices,
	parseSkills,
	parseStatus,
	parseStories,
	parseStoryLogs,
	parseYearStat,
} from '../index.js';

export const ingestRawSaveFile = (json: string) => {
	const rawSaveFile: RawSaveFile = JSON.parse(json);
	const parsedSaveFile: ParsedSaveFile = {
		fileVersion: rawSaveFile.saveFileVersion,
		week: rawSaveFile.week,
		expeditionJobId: rawSaveFile.expeditionJobID,
		playTime: rawSaveFile.secondsPlayed,
		mapCoords: rawSaveFile.mapCoords,
		mapName: rawSaveFile.mapName,

		playerName: rawSaveFile.princessName,
		pronouns: rawSaveFile.genderPronounsFloat,
		appearance: rawSaveFile.genderAppearanceFloat,

		cards: rawSaveFile.cards,
		gear: rawSaveFile.equippedGear,

		cheevos: rawSaveFile.cheevos,
		jobScores: rawSaveFile.lastJobScores,
		jobGoal: rawSaveFile.lastJobGoal,

		hardJobWins: rawSaveFile.lastHardJobWins,

		seenTutorials: rawSaveFile.seenTutorials,
		seenBackgrounds: rawSaveFile.seenBackgrounds,
		seenCards: rawSaveFile.seenCards,
		seenChoices: parseSeenChoices(rawSaveFile.seenChoicesSerialized),

		mapSpotsByMap: parseMapSpots(rawSaveFile.mapSpotsByMapSerialized),
		skills: parseSkills(rawSaveFile.skillsSerialized),
		memories: parseMemories(rawSaveFile.memoriesSerialized),
		love: parseLove(rawSaveFile.loveSerialized),
		statuses: parseStatus(rawSaveFile.statusesSerialized),
		stories: parseStories(rawSaveFile.storiesSerialized),
		storyLog: parseStoryLogs(rawSaveFile.storiesLogSerialized),
		yearsStats: parseYearStat(rawSaveFile.yearStatsSerialized),
		customGenderStrings: parseCustomGenderStrings(rawSaveFile.customGenderSerialized),
		groundhogs: parseGroundHogs(rawSaveFile.groundhogsSerialized),
	};

	// Round sliders to 2dp
	parsedSaveFile.pronouns = Math.round(parsedSaveFile.pronouns * 100) / 100;
	parsedSaveFile.appearance = Math.round(parsedSaveFile.pronouns * 100) / 100;

	// Round xyz to 2dp
	parsedSaveFile.mapCoords.x = Math.round(parsedSaveFile.mapCoords.x * 100) / 100;
	parsedSaveFile.mapCoords.y = Math.round(parsedSaveFile.mapCoords.y * 100) / 100;
	parsedSaveFile.mapCoords.z = Math.round(parsedSaveFile.mapCoords.z * 100) / 100;

	return parsedSaveFile;
};
