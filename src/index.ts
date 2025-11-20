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
import { MixedValue } from './types/mixedValue';
import { CustomGenderString } from './types/interface/customGenderString';

const parseKeyValueList = <T>(data: string, map: (key: string, value: string) => T | null): T[] => {
	const output: T[] = [];

	const parts: string[] = [];
	let current = '';

	for (let i = 0; i < data.length; i++) {
		const ch = data[i];

		// Makes sure there isn't a `|` following the `,`
		// If there is, it means we're inside a string
		if (ch === ',' && data[i + 1] !== '|') {
			parts.push(current);
			current = '';
		} else {
			current += ch;
		}
	}
	if (current) {
		parts.push(current);
	}

	for (const raw of parts) {
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

export const parseSkills = (skills: string): Skill[] => {
	return parseKeyValueList(skills, (name, value) => ({
		name,
		value: Number(value),
	}));
};

export const parseMemories = (memories: string): Memory[] => {
	return parseKeyValueList(memories, (name, value) => ({
		name,
		value: getMixedValue(value),
	}));
};

export const parseLove = (love: string): Love[] => {
	return parseKeyValueList(love, (character, value) => ({
		character,
		value: Number(value),
	}));
};

export const parseStatus = (status: string): Status[] => {
	return parseKeyValueList(status, (name, duration) => ({
		name,
		duration: Number(duration),
	}));
};

export const parseStories = (stories: string): Story[] => {
	return parseKeyValueList(stories, (name, month) => ({
		name,
		month: Number(month),
	}));
};

export const parseGroundHogs = (groundHogs: string): GroundHog[] => {
	return parseKeyValueList(groundHogs, (name, value) => ({
		name,
		value: getMixedValue(value),
	}));
};

export const parseMapSpots = (mapSpots: string) => {
	const output: Record<string, MapSpot[]> = {};
	const allMapSpotKVPs = mapSpots.split(';');

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

export const parseStoryLogs = (storyLogs: string) => {
	const output: StoryLog[] = [];
	const allStoryLogs = storyLogs.split(',');

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

export const parseYearStat = (yearStats: string) => {
	const output: YearStat[] = [];
	const allYearStats = yearStats.split(',');

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

export const parseCustomGenderStrings = (customGenderStrings: string): CustomGenderString[] => {
	return parseKeyValueList(customGenderStrings, (string, value) => ({
		string,
		value,
	}));
};

export const parseSeenChoices = (seenChoices: string) => {
	const output: SeenChoice[] = [];
	const allSeenChoices = seenChoices.split(',');

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

const stringifyMixedValue = (value: MixedValue): string => {
	switch (typeof value) {
		case 'boolean':
			return value ? 'true' : 'false';

		default:
			return String(value);
	}
};

const stringifyKeyValueList = <T>(items: T[], getKeyVal: (item: T) => [string, string]): string => {
	if (!items.length) return '';

	const parts = items.map((item) => {
		const [key, value] = getKeyVal(item);

		return `${key}: ${value}`;
	});

	return parts.join(', ') + ', ';
};

export const stringifySkills = (skills: Skill[]): string => {
	return stringifyKeyValueList(skills, (s) => [s.name, String(s.value)]);
};

export const stringifyMemories = (memories: Memory[]): string => {
	return stringifyKeyValueList(memories, (m) => [m.name, stringifyMixedValue(m.value)]);
};

export const stringifyLove = (love: Love[]): string => {
	return stringifyKeyValueList(love, (l) => [l.character, String(l.value)]);
};

export const stringifyStatus = (statuses: Status[]): string => {
	if (!statuses.length) return '';

	return stringifyKeyValueList(statuses, (s) => [s.name, String(s.duration)]);
};

export const stringifyStories = (stories: Story[]): string => {
	return stringifyKeyValueList(stories, (s) => [s.name, String(s.month)]);
};

export const stringifyGroundHogs = (groundHogs: GroundHog[]): string => {
	return stringifyKeyValueList(groundHogs, (g) => [g.name, stringifyMixedValue(g.value)]);
};

export const stringifyMapSpots = (mapSpotsByMap: Record<string, MapSpot[]>): string => {
	const segments: string[] = [];

	for (const [mapName, spots] of Object.entries(mapSpotsByMap)) {
		if (!mapName) continue;

		if (!spots || !spots.length) {
			segments.push(`${mapName}= `);
		} else {
			const spotsPart = spots.map((spot) => `${spot.name}:${spot.storyId}, `).join('');

			segments.push(`${mapName}= ${spotsPart}`);
		}
	}

	if (!segments.length) return '';

	return segments.join('; ') + '; ';
};

export const stringifyStoryLogs = (logs: StoryLog[]): string => {
	if (!logs.length) return '';

	const segments = logs.map((log) => {
		const inner = log.storyNames.map((name) => `${name}; `).join('');

		return `${log.month}: ${inner}`;
	});

	return segments.join(', ') + ', ';
};

export const stringifyYearStats = (stats: YearStat[]): string => {
	if (!stats.length) return '';

	const yearSegments = stats.map((yearStat) => {
		const pieces: string[] = [];

		for (const skill of yearStat.skills ?? []) {
			pieces.push(`skill~${skill.name}=${skill.value}`);
		}

		for (const love of yearStat.love ?? []) {
			pieces.push(`chara~${love.character}=${love.value}`);
		}

		const cards = yearStat.cards ?? [];

		if (cards.length) {
			pieces.push(`cards~${cards.join('/')}`);
		} else {
			pieces.push('cards~');
		}

		const jobs = yearStat.jobs ?? [];

		if (jobs.length) {
			pieces.push(`jobs~${jobs.join('/')}`);
		} else {
			pieces.push('jobs~');
		}

		for (const mem of yearStat.memories ?? []) {
			pieces.push(`mem~${mem.name}=${stringifyMixedValue(mem.value)}`);
		}

		const inner = pieces.map((p) => `${p}; `).join('');

		return `${yearStat.year}: ${inner}`;
	});

	return yearSegments.join(', ') + ', ';
};

export const stringifyCustomGenderStrings = (customGenderStrings: CustomGenderString[]): string => {
	if (!customGenderStrings.length) return '';

	return stringifyKeyValueList(customGenderStrings, (s) => [s.string, s.value]);
};

export const stringifySeenChoices = (choices: SeenChoice[]): string => {
	if (!choices.length) return '';

	const segments = choices.map((choice) => {
		const inner = choice.choiceIds.map((id) => `${id}; `).join('');

		return `${choice.storyId}: ${inner}`;
	});

	return segments.join(', ') + ', ';
};
