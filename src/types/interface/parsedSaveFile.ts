import { MapCoords } from './mapCoords';
import { MapSpot } from './mapSpot';
import { Skill } from './skill';
import { Memory } from './memory';
import { Love } from './love';
import { Status } from './status';
import { Story } from './story';
import { StoryLog } from './storyLog';
import { YearStat } from './yearStat';
import { GroundHog } from './groundHog';
import { SeenChoice } from './seenChoice';

export interface ParsedSaveFile {
	fileVersion: number;
	week: number;
	expeditionJobID: string;
	playTime: number;
	mapCoords: MapCoords;
	mapName: string;

	playerName: string;
	pronouns: number;
	appearance: number;

	cards: string[];
	gear: string[];

	cheevos: number[];
	jobScores: number[];
	jobGoals: number[];

	hardJobWins: boolean[];

	seenTutorials: string[];
	seenBackgrounds: string[];
	seenCards: string[];
	seenChoices: SeenChoice[];

	mapSpotsByMap: Record<string, MapSpot[]>;
	skills: Skill[];
	memories: Memory[];
	love: Love[];
	statuses: Status[];
	stories: Story[];
	storyLog: StoryLog[];
	yearsStats: YearStat[];
	groundhogs: GroundHog[];
}
