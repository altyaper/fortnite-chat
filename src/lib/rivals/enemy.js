export default class Enemy {
	constructor(canvas, radius, color, ctx) {
		if(Math.random() > 0.5) {
			this.x = Math.random() > 0.5 ? 0 - radius : canvas.width + radius;
			this.y = Math.random() * canvas.height;
		} else {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() > 0.5 ? 0 - radius : canvas.height + radius;
		}
		this.radius = radius;
		this.color = color;
		this.canvas = canvas;

		const angle = Math.atan2(this.canvas.height / 2 - this.y, this.canvas.width / 2 - this.x);
		const velocity = {
			x: Math.cos(angle) * 0.3,
			y: Math.sin(angle) * 0.3,
		}
		this.velocity = velocity;
		this.ctx = ctx;
	}

	draw() {
		this.ctx.beginPath();
 		this.ctx.fillStyle = this.color;
		this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		this.ctx.closePath();
		this.ctx.fill();
	}

	update() {
		this.draw();
		this.x = this.x + this.velocity.x * 3;
		this.y = this.y + this.velocity.y * 3;
	}
}