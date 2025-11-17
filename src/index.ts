import { ingestRawSaveFile } from './utilities/ingestRawSaveFile.js';
import { getSampleRawSaveFile } from './utilities/getSampleRawSaveFile.js';
import { SaveGame } from './types/class/saveGame.js';

const saveGame = new SaveGame(ingestRawSaveFile(getSampleRawSaveFile()));

	parseMapSpots,
