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
		pronouns: Math.round(rawSaveFile.genderPronounsFloat * 10) / 10,
		appearance: Math.round(rawSaveFile.genderAppearanceFloat * 10) / 10,

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

	return parsedSaveFile;
};
