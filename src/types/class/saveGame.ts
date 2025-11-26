import { ParsedSaveFile } from '../interface/parsedSaveFile';
import { MapCoords } from '../interface/mapCoords';
import { MapSpot } from '../interface/mapSpot';
import { Skill } from '../interface/skill';
import { Memory } from '../interface/memory';
import { MixedValue } from '../mixedValue';
import { Love } from '../interface/love';
import { Status } from '../interface/status';
import { Story } from '../interface/story';
import { StoryLog } from '../interface/storyLog';
import { YearStat } from '../interface/yearStat';
import { GroundHog } from '../interface/groundHog';
import { SeenChoice } from '../interface/seenChoice';
import { CustomGenderString } from '../interface/customGenderString';
import { getCardDetails } from '../../utilities/getCardDetails';
import { getSkillDetails } from '../../utilities/getSkillDetails';

export class SaveGame {
	constructor(private data: ParsedSaveFile) {}

	get parsedSaveFile(): ParsedSaveFile {
		return this.data;
	}

	//region Week
	get week() {
		return this.data.week;
	}

	set week(week: number) {
		this.data.week = week;
	}
	//endregion

	//region Expedition Job ID
	get expeditionJobId() {
		return this.data.expeditionJobId;
	}

	set expeditionJobId(expeditionJobId: string) {
		this.data.expeditionJobId = expeditionJobId;
	}
	//endregion

	//region Play Time
	get playTime() {
		return Math.round(this.data.playTime);
	}

	set playTime(seconds: number) {
		this.data.playTime = seconds;
	}
	//endregion

	//region Map Coords
	get mapCoords() {
		return this.data.mapCoords;
	}

	set mapCoords(coords: MapCoords) {
		this.data.mapCoords = coords;
	}

	setMapCoord(coord: string, value: number) {
		const coordLower = coord.toLowerCase();

		if (coordLower !== 'x' && coordLower !== 'y' && coordLower !== 'z') {
			return;
		}

		this.data.mapCoords[coordLower] = value;
	}
	//endregion

	//region Map Name
	get mapName() {
		return this.data.mapName;
	}

	set mapName(name: string) {
		this.data.mapName = name;
	}
	//endregion

	//region Map Spots
	get mapSpots(): Record<string, MapSpot[]> {
		return this.data.mapSpotsByMap;
	}

	set mapSpots(mapSpots: Record<string, MapSpot[]>) {
		this.data.mapSpotsByMap = mapSpots;
	}

	getMapSpotsForMap(map: string) {
		return this.data.mapSpotsByMap[map] ?? [];
	}

	setMapSpotsForMap(map: string, mapSpots: MapSpot[]): this {
		this.data.mapSpotsByMap[map] = mapSpots;

		return this;
	}
	//endregion

	//region Player Name
	get playerName() {
		return this.data.playerName;
	}

	set playerName(name: string) {
		this.data.playerName = name;
	}
	//endregion

	//region Pronouns
	get pronouns() {
		return this.data.pronouns;
	}

	set pronouns(value: number) {
		this.data.pronouns = value;
	}
	//endregion

	//region Appearance
	get appearance() {
		return this.data.appearance;
	}

	set appearance(value: number) {
		this.data.appearance = value;
	}
	//endregion

	//region Skills
	get skills() {
		return this.data.skills;
	}

	set skills(value: Skill[]) {
		for (const skill of value) {
			if (skill.value < 0 || skill.value > 100) {
				throw new Error(`Skill "${skill.name}" had an invalid value`);
			}
		}

		this.data.skills = value;
	}

	getSkill(name: string) {
		const skill = this.data.skills.find((i) => i.name === name);

		return skill?.value ?? 0;
	}

	setSkill(name: string, value: number): this {
		const validSkill = !!getSkillDetails(name);

		if (!validSkill) return this;

		if (value < 0 || value > 100) {
			if (name !== 'kudos' || value > 999) {
				throw new Error(`Skill "${name}" had an invalid value`);
			}
		}

		const skill = this.data.skills.find((i) => i.name === name);

		if (skill) {
			skill.value = value;
		} else {
			this.data.skills.push({ name, value });
		}

		return this;
	}
	//endregion

	//region Memories
	get memories() {
		return this.data.memories;
	}

	set memories(memories: Memory[]) {
		this.data.memories = memories;
	}

	getMemoryValue(name: string) {
		const memory = this.data.memories.find((i) => i.name === name);

		return memory?.value ?? null;
	}

	setMemoryValue(name: string, value: MixedValue): this {
		const memory = this.data.memories.find((i) => i.name === name);

		if (memory) {
			memory.value = value;
		} else {
			this.data.memories.push({ name, value });
		}

		return this;
	}
	//endregion

	//region Love
	get love() {
		return this.data.love;
	}

	set love(love: Love[]) {
		for (const l of love) {
			if (l.value < 0 || l.value > 100) {
				throw new Error(`Love for "${l.character}" had an invalid value`);
			}
		}

		this.data.love = love;
	}

	getLove(character: string) {
		const love = this.data.love.find((i) => i.character === character);

		return love?.value ?? 0;
	}

	setLove(character: string, value: number): this {
		if (value < 0 || value > 100) {
			throw new Error(`Love for "${character}" had an invalid value`);
		}

		const love = this.data.love.find((i) => i.character === character);

		if (love) {
			love.value = value;
		} else {
			this.data.love.push({ character, value });
		}

		return this;
	}
	//endregion

	//region Statuses
	get statuses() {
		return this.data.statuses;
	}

	set statuses(statuses: Status[]) {
		for (const status of statuses) {
			if (status.duration < 0) {
				throw new Error(`Status "${status.name}" had an invalid value`);
			}
		}

		this.data.statuses = statuses;
	}

	getStatusDuration(name: string) {
		const status = this.data.statuses.find((i) => i.name === name);

		return status?.duration ?? 0;
	}

	setStatusDuration(name: string, duration: number): this {
		if (duration < 0) {
			throw new Error(`Status "${name}" had an invalid value`);
		}

		const status = this.data.statuses.find((i) => i.name === name);

		if (status) {
			status.duration = duration;
		} else {
			this.data.statuses.push({ name, duration });
		}

		return this;
	}
	//endregion

	//region Stories
	get stories() {
		return this.data.stories;
	}

	set stories(stories: Story[]) {
		this.data.stories = stories;
	}

	getStoryMonth(name: string) {
		const story = this.data.stories.find((i) => i.name === name);

		return story?.month ?? 0;
	}

	setStoryMonth(name: string, value: number): this {
		const story = this.data.stories.find((i) => i.name === name);

		if (story) {
			story.month = value;
		} else {
			this.data.stories.push({ name, month: value });
		}

		return this;
	}
	//endregion

	//region Story Log
	get storyLog() {
		return this.data.storyLog;
	}

	set storyLog(storyLogs: StoryLog[]) {
		this.data.storyLog = storyLogs;
	}

	getStoryLog(month: number) {
		const storyLog = this.data.storyLog.find((i) => i.month === month);

		return storyLog?.storyNames ?? [];
	}

	setStoryLog(month: number, storyNames: string[]): this {
		const storyLog = this.data.storyLog.find((i) => i.month === month);

		if (storyLog) {
			storyLog.storyNames = storyNames;
		} else {
			this.data.storyLog.push({ month, storyNames });
		}

		return this;
	}
	//endregion

	//region Year Stats
	get yearStats() {
		return this.data.yearsStats;
	}

	set yearStats(yearStats: YearStat[]) {
		this.data.yearsStats = yearStats;
	}

	getYearStats(year: number) {
		const yearStat = this.data.yearsStats.find((i) => i.year === year);

		return yearStat ?? null;
	}

	setYearStats(year: number, value: YearStat): this {
		const yearStat = this.data.yearsStats.find((i) => i.year === year);

		if (yearStat) {
			Object.assign(yearStat, value, { year });
		} else {
			this.data.yearsStats.push({ ...value, year });
		}

		return this;
	}
	//endregion

	//region Custom Gender
	get customGenderStrings() {
		return this.data.customGenderStrings;
	}

	set customGenderStrings(customGenderStrings: CustomGenderString[]) {
		this.data.customGenderStrings = customGenderStrings;
	}

	changeCustomGenderString(string: string, value: string) {
		const customGenderString = this.data.customGenderStrings.find((i) => i.string === string);

		if (customGenderString) {
			customGenderString.value = value;
		} else {
			this.data.customGenderStrings.push({ string: string, value });
		}
	}
	//endregion

	//region Seen Tutorials
	get seenTutorials() {
		return this.data.seenTutorials;
	}

	set seenTutorials(seenTutorials: string[]) {
		this.data.seenTutorials = seenTutorials;
	}
	//endregion

	//region Cards
	get cards() {
		return this.data.cards;
	}

	set cards(cards: string[]) {
		this.data.cards = cards;
	}

	hasCard(name: string) {
		return this.data.cards.includes(name.toLowerCase());
	}

	countCard(name: string) {
		return this.data.cards.reduce(
			(count, c) => (c === name.toLowerCase() ? count + 1 : count),
			0,
		);
	}

	addCard(name: string): this {
		const details = getCardDetails(name);

		if (!details || (this.hasCard(name) && details.type === 'gear')) return this;

		this.data.cards.push(name.toLowerCase());

		return this;
	}

	removeCard(name: string): this {
		const index = this.data.cards.indexOf(name.toLowerCase());

		if (index === -1) return this;

		this.data.cards.splice(index, 1);

		const details = getCardDetails(name);

		if (details && details.type === 'gear') {
			// Does a `hasHear` gear check internally
			this.removeGear(name);
		}

		return this;
	}

	removeAllCardsWithName(name: string): this {
		this.data.cards = this.data.cards.filter((c) => c !== name.toLowerCase());

		return this;
	}
	//endregion

	//region Gear
	get gear() {
		return this.data.gear;
	}

	set gear(gear: string[]) {
		this.data.gear = gear;
	}

	hasGear(gear: string) {
		return this.data.gear.includes(gear.toLowerCase());
	}

	addGear(gear: string): this {
		if (this.hasGear(gear)) return this;

		this.data.gear.push(gear.toLowerCase());

		return this;
	}

	removeGear(gear: string) {
		if (!this.hasGear(gear)) return;

		this.data.gear = this.data.gear.filter((i) => i !== gear.toLowerCase());
	}
	//endregion

	//region Job Scores
	get jobScores() {
		return this.data.jobScores;
	}

	set jobScores(jobScores: number[]) {
		this.data.jobScores = jobScores;
	}
	//endregion

	//region Job Goal
	get jobGoal() {
		return this.data.jobGoal;
	}

	set jobGoal(jobGoal: number[]) {
		this.data.jobGoal = jobGoal;
	}
	//endregion

	//region Hard Wins
	get hardWins() {
		return this.data.hardJobWins;
	}

	set hardWins(hardWins: boolean[]) {
		this.data.hardJobWins = hardWins;
	}
	//endregion

	//region Ground Hogs
	get groundHogs() {
		return this.data.groundhogs;
	}

	set groundHogs(groundHogs: GroundHog[]) {
		this.data.groundhogs = groundHogs;
	}

	hasGroundHog(name: string) {
		return !!this.data.groundhogs.find((i) => i.name === name);
	}

	addGroundHog(name: string, value: MixedValue): this {
		if (this.hasGroundHog(name)) return this;

		this.data.groundhogs.push({ name, value });

		return this;
	}

	setGroundHog(name: string, value: MixedValue): this {
		const groundHog = this.data.groundhogs.find((i) => i.name === name);

		if (groundHog) {
			groundHog.value = value;
		} else {
			this.data.groundhogs.push({ name, value });
		}

		return this;
	}

	removeGroundHog(name: string) {
		if (!this.hasGroundHog(name)) return;

		this.data.groundhogs = this.data.groundhogs.filter((i) => i.name !== name);
	}
	//endregion

	//region Seen Choices
	get seenChoices() {
		return this.data.seenChoices;
	}

	set seenChoices(choices: SeenChoice[]) {
		this.data.seenChoices = choices;
	}

	getSeenChoices(storyId: string) {
		const seenChoices = this.data.seenChoices.find((i) => i.storyId === storyId);

		return seenChoices?.choiceIds ?? [];
	}

	setSeenChoices(storyId: string, choiceIds: string[]): this {
		const seenChoices = this.data.seenChoices.find((i) => i.storyId === storyId);

		if (seenChoices) {
			seenChoices.choiceIds = choiceIds;
		} else {
			this.data.seenChoices.push({ storyId, choiceIds });
		}

		return this;
	}
	//endregion

	//region Seen Backgrounds
	get seenBackgrounds() {
		return this.data.seenBackgrounds;
	}

	set seenBackgrounds(backgrounds: string[]) {
		this.data.seenBackgrounds = backgrounds;
	}

	hasSeenBackground(name: string) {
		return this.data.seenBackgrounds.includes(name.toLowerCase());
	}

	addSeenBackground(name: string): this {
		if (this.hasSeenBackground(name)) return this;

		this.data.seenBackgrounds.push(name.toLowerCase());

		return this;
	}

	removeSeenBackground(name: string) {
		if (!this.hasSeenBackground(name)) return;

		this.data.seenBackgrounds = this.data.seenBackgrounds.filter(
			(i) => i !== name.toLowerCase(),
		);
	}
	//endregion

	//region Seen Cards
	get seenCards() {
		return this.data.seenCards;
	}

	set seenCards(cards: string[]) {
		this.data.seenCards = cards;
	}

	hasSeenCard(name: string) {
		return this.data.seenCards.includes(name.toLowerCase());
	}

	addSeenCard(name: string): this {
		if (this.hasSeenCard(name)) return this;

		this.data.seenCards.push(name.toLowerCase());

		return this;
	}

	removeSeenCard(name: string) {
		if (!this.hasSeenCard(name)) return;

		this.data.seenCards = this.data.seenCards.filter((i) => i !== name.toLowerCase());
	}
	//endregion

	//region Cheevos
	get cheevos() {
		return this.data.cheevos;
	}

	set cheevos(cheevos: number[]) {
		this.data.cheevos = cheevos;
	}

	hasCheevo(cheevo: number) {
		return this.data.cheevos.includes(cheevo);
	}

	addCheevo(cheevo: number): this {
		if (this.hasCheevo(cheevo)) return this;

		this.data.cheevos.push(cheevo);

		return this;
	}

	removeCheevo(cheevo: number) {
		if (!this.hasCheevo(cheevo)) return;

		this.data.cheevos = this.data.cheevos.filter((i) => i !== cheevo);
	}
	//endregion
}
