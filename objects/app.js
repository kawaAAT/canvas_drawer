import PointsStorage from "./points-storage.js";
import History from "./history.js";
import SaveCommand from "./save-command.js";

export default class App {
	constructor(ctx) {

		this._ctx = ctx;
		this._storage = null;
		this._color = null;

		this._isPointerDown = false;
		this._saveHappened = false;

		this._init();
	}

	_init() {
		this._storage = new PointsStorage();
		this._history = new History();
		this._saveCommand = new SaveCommand(this._history);

		this.setColor('#ff0000');
		this._save();
	}

	_save() {
		this._saveCommand.save([...this._storage.getData()]);
	}

	_redraw() {
		const ctx = this._ctx;
		const pointsArr = this._storage.getData();

		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		ctx.lineJoin = "round";
		ctx.lineWidth = 5;

		for (let i = 1; i < pointsArr.length; i++) {
			const { x, y, color, drag } = pointsArr[i];
			const { x: x0, y: y0 } = pointsArr[i - 1];

			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo(drag ? x0 : x, drag ? y0 : y - 1);
			ctx.lineTo(x, y);
			ctx.closePath();
			ctx.stroke();
		}
	}

	onMouseDown(elem) {
		this._isPointerDown = true;

		this._storage.addPoint(elem.pageX, elem.pageY, this._color);
		this._redraw();
	}

	onMouseUp(elem) {
		this._isPointerDown = false;
		this._save();
	}

	onMouseLeave(elem) {
		// this._isPointerDown = false;
		// this._save();
	}

	onMouseMove(elem) {
		if (this._isPointerDown) {
			this._storage.addPoint(elem.pageX, elem.pageY, this._color, true);
			this._redraw();
		}
	}

	setColor(hex) {
		this._color = hex;
	}

	onStepBack() {
		const newState = this._history.getLast();
		if (newState.length === 0) return;

		this._storage.updateData(newState);
		this._redraw();
	}
}