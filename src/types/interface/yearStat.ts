import { Skill } from './skill';
import { Love } from './love';
import { Memory } from './memory';

export interface YearStat {
	year: number;
	skills: Skill[];
	love: Love[];
	memories: Memory[];
	cards: string[];
	jobs: string[];
}
