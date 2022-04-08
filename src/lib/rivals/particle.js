import Circle from './circle';

export default class Particle extends Circle {
	constructor(...args) {
		super(...args);
		this.alpha = 1;
	}

	update() {
		this.draw();
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
		this.alpha -= 0.02;
	}
}