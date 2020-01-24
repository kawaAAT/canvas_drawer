export default class History {
	constructor() {
		this._maxSize = 5;
		this._reserved = [{}];
		this._storage = new Deque();
	}

	add(data) {
		this._storage.add(data);

		if (this._maxSize < this._storage.getCount())
			this._reserved = this._storage.shift();
	}

	getLast() {
		this._storage.showFullMemory();

		if (this._storage.getCount() > 1)
			this._storage.pop();

		return this._storage.getLast();
	}
}

class Deque {
	constructor() {
		this._count = 0;

		this._head = null;
		this._tail = null;
	}

	add(data) {
		const node = new Node(data);

		if (this._head) {
			if (!this._head.next) {
				this._head.next = node;
				node.prev = this._head;
			}
		}
		else {
			this._head = node;
		}

		if (this._tail) {
			this._tail.next = node;
			node.prev = this._tail;
		}

		this._tail = node;
		this._count++;
	}

	pop() {
		if (!this._tail && !this._head) return null;
		this._count--;

		const node = this._tail;
		this._tail = this._tail.prev;

		if (this._tail) {
			this._tail.next = null;
		}

		if (this._count === 0) {
			this._head = null;
		}

		return node.data;
	}

	shift() {
		if (!this._tail && !this._head) return null;
		this._count--;

		const node = this._head;
		this._head = node.next;
		this._head.prev = null;

		return node.data;
	}

	getCount() {
		return this._count;
	}

	getLast() {
		return this._tail ? [...this._tail.data] : [];
	}

	//for debug
	showFullMemory() {
		let allMemory = '';

		const addNew = node => {
			if (!node) return;

			allMemory += node.data.length + ' ';
			if (node.next) addNew(node.next);
		};

		addNew(this._head);
		console.log(allMemory);
	}
}

class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
		this.prev = null;
	}
}