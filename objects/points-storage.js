export default class PointsStorage {
	constructor() {
		this._storage = [{}];
	}

	addPoint(x, y, color, drag = false) {
		this._storage.push({ x, y, color, drag });
	}

	updateData(arr) {
		this._storage = arr ? arr : [];;
	}

	getData() {
		return this._storage;
	}
}