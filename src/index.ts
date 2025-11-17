import { RawSaveFile } from './types/interface/rawSaveFile';
import { getSampleRawSaveFile } from './utilities/getSampleRawSaveFile.js';
import { ParsedSaveFile } from './types/interface/parsedSaveFile';
import {
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
} from './parser.js';

export const ingestRawSaveFile = (json: string) => {
	const rawSaveFile: RawSaveFile = JSON.parse(json);
	const parsedSaveFile: ParsedSaveFile = {
		fileVersion: rawSaveFile.saveFileVersion,
		week: rawSaveFile.week,
		expeditionJobID: rawSaveFile.expeditionJobID,
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
		jobGoals: rawSaveFile.lastJobGoal,

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
		// TODO: `customGenderSerialized` - create a game and see about setting this value
		groundhogs: parseGroundHogs(rawSaveFile.groundhogsSerialized),
	};

	console.log(parsedSaveFile);
};

ingestRawSaveFile(getSampleRawSaveFile());
