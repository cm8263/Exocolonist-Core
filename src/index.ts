import { MapSpot } from './types/interface/mapSpot';
import { Skill } from './types/interface/skill';
import { Memory } from './types/interface/memory';
import { Love } from './types/interface/love';
import { Status } from './types/interface/status';
import { Story } from './types/interface/story';
import { StoryLog } from './types/interface/storyLog';
import { YearStat } from './types/interface/yearStat';
import { GroundHog } from './types/interface/groundHog';
import { getMixedValue } from './utilities/getMixedValue.js';
import { SeenChoice } from './types/interface/seenChoice';

export const parseSkills = (data: string): Skill[] => {
	return parseKeyValueList(data, (name, value) => ({
		name,
		value: Number(value),
	}));
};

export const parseMemories = (data: string): Memory[] => {
	return parseKeyValueList(data, (name, value) => ({
		name,
		value: getMixedValue(value),
	}));
};

export const parseLove = (data: string): Love[] => {
	return parseKeyValueList(data, (character, value) => ({
		character,
		value: Number(value),
	}));
};

export const parseStatus = (data: string): Status[] => {
	return parseKeyValueList(data, (name, duration) => ({
		name,
		duration: Number(duration),
	}));
};

export const parseStories = (data: string): Story[] => {
	return parseKeyValueList(data, (name, month) => ({
		name,
		month: Number(month),
	}));
};

export const parseGroundHogs = (data: string): GroundHog[] => {
	return parseKeyValueList(data, (name, value) => ({
		name,
		value: getMixedValue(value),
	}));
};

export const parseMapSpots = (data: string) => {
	const output: Record<string, MapSpot[]> = {};
	const allMapSpotKVPs = data.split(';');

	for (const mapSpotKVP of allMapSpotKVPs) {
		let [mapName, mapSpots] = mapSpotKVP.split('=');

		mapName = mapName.trim();

		if (!mapName) {
			continue;
		}

		if (!mapSpots) {
			output[mapName] = [];
			continue;
		}

		mapSpots = mapSpots.trim();
		output[mapName] = parseMapSpot(mapSpots);
	}

	return output;
};

export const parseStoryLogs = (data: string) => {
	const output: StoryLog[] = [];
	const allStoryLogs = data.split(',');

	for (const story of allStoryLogs) {
		let [month, storyNames] = story.split(':');

		month = month.trim();

		if (!storyNames) continue;

		storyNames = storyNames.trim();

		const allStoryNames: string[] = [];

		for (const storyName of storyNames.split(';')) {
			const finalStoryName = storyName.trim();

			if (finalStoryName) allStoryNames.push(finalStoryName);
		}

		output.push({ month: Number(month), storyNames: allStoryNames });
	}

	return output;
};

export const parseYearStat = (data: string) => {
	const output: YearStat[] = [];
	const allYearStats = data.split(',');

	for (const yearStat of allYearStats) {
		let [year, data] = yearStat.split(':');

		year = year.trim();

		if (!data) continue;

		data = data.trim();

		const skills: Skill[] = [];
		const love: Love[] = [];
		const memories: Memory[] = [];

		let cards: string[] = [];
		let jobs: string[] = [];

		for (const value of data.split(';')) {
			let [ident, valueKVP] = value.split('~');

			ident = ident.trim();

			if (!valueKVP) continue;

			valueKVP = valueKVP.trim();

			switch (ident) {
				case 'skill': {
					const [name, value] = valueKVP.split('=');

					skills.push({ name, value: Number(value) });
					break;
				}

				case 'chara': {
					const [character, value] = valueKVP.split('=');

					love.push({ character, value: Number(value) });
					break;
				}

				case 'cards': {
					const cardNames = valueKVP.split('/');

					cards = cardNames.filter((cardName) => cardName !== '');
					break;
				}

				case 'mem': {
					const [name, value] = valueKVP.split('=');

					memories.push({ name, value: getMixedValue(value) });
					break;
				}

				case 'jobs': {
					const jobNames = valueKVP.split('/');

					jobs = jobNames.filter((jobName) => jobName !== '');
					break;
				}
			}
		}

		output.push({ year: Number(year), skills, love, memories, cards, jobs });
	}

	return output;
};

export const parseSeenChoices = (data: string) => {
	const output: SeenChoice[] = [];
	const allSeenChoices = data.split(',');

	for (const seemChoice of allSeenChoices) {
		let [storyId, choiceIds] = seemChoice.split(':');

		storyId = storyId.trim();

		if (!choiceIds) continue;

		choiceIds = choiceIds.trim();

		const allChoiceIds: string[] = [];

		for (const choiceId of choiceIds.split(';')) {
			const finalChoiceId = choiceId.trim();

			if (finalChoiceId) allChoiceIds.push(finalChoiceId);
		}

		output.push({ storyId, choiceIds: allChoiceIds });
	}

	return output;
};

const parseKeyValueList = <T>(data: string, map: (key: string, value: string) => T | null): T[] => {
	const output: T[] = [];

	for (const raw of data.split(',')) {
		if (!raw.trim()) continue;

		let [key, value] = raw.split(':', 2);
		key = key?.trim() ?? '';
		value = value?.trim() ?? '';

		if (!key || !value) continue;

		const mapped = map(key, value);
		if (mapped) output.push(mapped);
	}

	return output;
};

const parseMapSpot = (data: string) => {
	const output: MapSpot[] = [];
	const allMapSpots = data.split(',');

	for (const mapSpot of allMapSpots) {
		let [name, storyId] = mapSpot.split(':');

		name = name.trim();

		if (!storyId) continue;

		storyId = storyId.trim();
		output.push({ name, storyId });
	}

	return output;
};
