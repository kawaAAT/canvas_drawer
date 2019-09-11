export default class SaveCommand {
	constructor(history) {

		this._lastData = [];
		this._history = history;
	}

	save(data) {
		if (this._checkForSimilarity(data)) return;

		this._history.add(data);
		this._lastData = data;
	}

	// not so accurate, but it's miss won't break anything
	_checkForSimilarity(data) {
		if (this._lastData.length === data.length) return true;
		return false;
	}

}