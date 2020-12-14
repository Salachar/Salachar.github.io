import React, { Component } from 'react';
import { Link } from "react-router-dom";

import styles from './Landing.module.css';

const INITIAL_OBJECT_AMOUNT = 100;
const MAX_OBjECT_RADIUS = 50;
const MIN_OBJECT_RADIUS = 10;

const BACKGROUND_COLORS = [
  '#dfdbd8',
  '#565c5e',
  '#112432',
  '#393d3a',
];

class Landing extends Component {
  constructor() {
    super();

    this.bg_index = 0;

    this.mouse = {};
    this.canvas_objects = [];

    this.obj_size = 1;
    this.obj_color = null;
    this.obj_size_timer = null;

    this.stop_loop = false;
    this.loop = null;
    this.canvasRef = React.createRef();

    this.onResize = this.onResize.bind(this);
    this.onCanvasMouseDown = this.onCanvasMouseDown.bind(this);
    this.onCanvasMouseUp = this.onCanvasMouseUp.bind(this);
    this.onCanvasMouseMove = this.onCanvasMouseMove.bind(this);
    this.onCanvasMouseLeave = this.onCanvasMouseLeave.bind(this);

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('keydown', this.onKeyDown);
    this.onResize();
    this.generateCanvasObjects();
    this.canvasLoop();

    [
      'Some basic controls:',
      ' - Click to create a bubble, hold to increase size',
      ' - Move mouse during creation for direction/power',
      ' - Arrow Up to create a random sphere',
      ' - Arrow Down to delete spheres, starting with latest',
      ' - Arrow Left/Right to change background color'
    ].forEach((message) => {
      console.log(message);
    });
  }

  componentWillUnmount() {
    this.stop_loop = true;
    window.clearInterval(this.obj_size_timer);
    this.obj_size_timer = null;
    window.cancelAnimationFrame(this.loop);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('keydown', this.onKeyDown);
  }

  getRandomColor() {
    const colors = [
      'b5c2c7',
      'e7cac2',
      '7aa39a',
      '5e7783',
      '4d1635',
      'd8b26e',
      'decec8',
      'd5e9dd',
      '94a8b3',
      'd4e8dc',
      'd8b26e',
      'cebeb9',
    ];
    return '#' + colors[Math.floor(Math.random() * colors.length)];
  }

  generateCanvasObject(obj_overrides = {}) {
    const canvas = this.canvasRef.current;
    const { width, height } = canvas;
    const radius = obj_overrides.r || Math.random() * MAX_OBjECT_RADIUS + MIN_OBJECT_RADIUS;

    return {
      x: MAX_OBjECT_RADIUS + ((Math.random() * width) - (MAX_OBjECT_RADIUS * 2)),
      y: MAX_OBjECT_RADIUS + ((Math.random() * height) - (MAX_OBjECT_RADIUS * 2)),
      r: radius,
      m: (radius * radius) / 10, // squared radius for exponential mass
      vx: (Math.random() * 2) - 1, // -1 => 1
      vy: (Math.random() * 2) - 1, // -1 => 1
      range: radius * 5, // A limit to the gravitatiol range
      color: this.getRandomColor(),
      ...obj_overrides,
    };
  }

  generateCanvasObjects() {
    for (let i = 0; i < INITIAL_OBJECT_AMOUNT; ++i) {
      this.canvas_objects.push(this.generateCanvasObject());
    }
  }

  canvasLoop () {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    if (this.stop_loop) return;
		this.loop = window.requestAnimationFrame(() => {
			this.canvasLoop();
    });

    this.canvasUpdate();
  }

  canvasUpdate() {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas;

    // Clear out the canvas for drawing
    const c = canvas.getContext('2d');
    c.clearRect(0, 0, width, height);

    const canvas_objects_length = this.canvas_objects.length;
    for (let i = 0; i < canvas_objects_length; ++i) {
      // Super shitty initial "gravity" implementation
      const obj = this.canvas_objects[i];

      // go through all the other objects and apply their
      // gravitational force to the current obj
      for (var k = 0; k < canvas_objects_length; ++k) {
        // Ignore the same object
        if (i === k) continue;
        const other_obj = this.canvas_objects[k];

        const x_dis = other_obj.x - obj.x;
        const y_dis = other_obj.y - obj.y;
        const dist = Math.sqrt((x_dis * x_dis) + (y_dis * y_dis));

        // Don't apply gravity if the two objects are too close together
        if (dist < obj.r + other_obj.r || dist > other_obj.range) continue;

        const gravitational_constant = 0.005;
        let force = (gravitational_constant * obj.m * other_obj.m) / (dist * dist);
        // force *= MIN_OBJECT_RADIUS / obj.r;
        obj.vx += (x_dis / dist) * force;
        obj.vy += (y_dis / dist) * force;
      }

      obj.x += obj.vx;
      obj.y += obj.vy;

      if (obj.x - obj.r < 0 && obj.vx < 0) obj.vx *= -1;
      if (obj.x + obj.r > width && obj.vx > 0) obj.vx *= -1;
      if (obj.y - obj.r < 0 && obj.vy < 0) obj.vy *= -1
      if (obj.y + obj.r > height && obj.vy > 0) obj.vy *= -1

      c.globalAlpha = 0.2;
      c.beginPath();
      c.arc(obj.x, obj.y, obj.r, 0, 2 * Math.PI);
		  c.fillStyle = obj.color;
      c.fill();
    }

    if (this.mouse.down) {
      c.beginPath();
      c.arc(this.mouse.down_x, this.mouse.down_y, this.obj_size, 0, 2 * Math.PI);
		  c.fillStyle = this.obj_color;
      c.fill();

      c.beginPath();
      c.moveTo(this.mouse.down_x, this.mouse.down_y);
      c.lineTo(this.mouse.x, this.mouse.y);
      // c.strokeStyle = '#565c5e';
      c.strokeStyle = '#FFF';
      c.lineWidth = 10;
      c.stroke();
    }
  }

  onResize() {
    const canvas = this.canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  getMousePos(e) {
    const canvas = this.canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  onCanvasMouseDown(e) {
    if (e.buttons !== 1) return;

    this.mouse.down = true;
    this.mouse.down_x = this.mouse.x;
    this.mouse.down_y = this.mouse.y;

    this.obj_color = this.getRandomColor();
    this.obj_size_timer = window.setInterval(() => {
      this.obj_size += 1;
    }, 10);
  }

  onCanvasMouseUp(e) {
    this.mouse.down = false;

    window.clearInterval(this.obj_size_timer);
    this.obj_size_timer = null;

    const dir_x = this.mouse.x - this.mouse.down_x;
    const dir_y = this.mouse.y - this.mouse.down_y;

    let vx = 0;
    let vy = 0;
    if (dir_x !== 0 && dir_y !== 0) {
      const dist = Math.sqrt((dir_x * dir_x) + (dir_y * dir_y));
      const unit_x = dir_x / dist;
      const unit_y = dir_y / dist;
      vx = unit_x * (dist / 50);
      vy = unit_y * (dist / 50)
    }

    this.canvas_objects.push(this.generateCanvasObject({
      x: this.mouse.down_x,
      y: this.mouse.down_y,
      r: this.obj_size,
      vx: vx,
      vy: vy,
      color: this.obj_color,
    }));

    this.mouse.down_x = null;
    this.mouse.down_y = null;
    this.obj_size = 1;
  }

  onCanvasMouseMove(e) {
    const pos = this.getMousePos(e);
    this.mouse = {
      ...this.mouse,
      ...pos,
    };
  }

  onCanvasMouseLeave(e) {
    this.mouse.down = false;
    window.clearInterval(this.obj_size_timer);
    this.obj_size_timer = null;
    this.mouse.down_x = null;
    this.mouse.down_y = null;
    this.obj_size = 1;
  }

  onKeyDown(e) {
    const canvas = this.canvasRef.current;
    if (!canvas) return;

    switch (e.key) {
      case 'ArrowLeft':
        this.bg_index -= 1;
        if (this.bg_index < 0) this.bg_index = BACKGROUND_COLORS.length - 1;
        canvas.style.backgroundColor = BACKGROUND_COLORS[this.bg_index];
        break;
      case 'ArrowRight':
        this.bg_index += 1;
        if (this.bg_index > BACKGROUND_COLORS.length - 1) this.bg_index = 0;
        canvas.style.backgroundColor = BACKGROUND_COLORS[this.bg_index];
        break;
      case 'ArrowUp':
        this.canvas_objects.push(this.generateCanvasObject());
        break;
      case 'ArrowDown':
        this.canvas_objects.pop();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Link to="/about" className={styles.info}>
          <div className={styles.name}>Ray Davidson</div>
          <div className={styles.title}>Software Developer</div>
          <div className={styles.disclaimer}>...and his obligatory canvas landing page</div>
        </Link>
        <canvas
          ref={this.canvasRef}
          className={styles.canvas}
          onMouseDown={this.onCanvasMouseDown}
          onMouseUp={this.onCanvasMouseUp}
          onMouseMove={this.onCanvasMouseMove}
          onMouseLeave={this.onCanvasMouseLeave}
        />
      </div>
    );
  }
}

export default Landing;
