import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

import styles from './Landing.module.css';

const INITIAL_OBJECT_AMOUNT = 100;
const MAX_OBjECT_RADIUS = 50;

class Landing extends Component {
  constructor() {
    super();

    this.mouse = {};
    this.rain_drops = [];

    this.canvas_objects = [];

    this.stop_loop = false;
    this.loop = null;
    this.canvasRef = React.createRef();

    this.onResize = this.onResize.bind(this);
    this.onCanvasMouseMove = this.onCanvasMouseMove.bind(this);
    this.onCanvasMouseDown = this.onCanvasMouseDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();

    this.generateCanvasObjects();

    this.canvasLoop();
  }

  componentWillUnmount() {
    this.stop_loop = true;
    window.cancelAnimationFrame(this.loop);
    window.removeEventListener('resize', this.onResize);
  }

  generateCanvasObjects() {
    const canvas = this.canvasRef.current;
    const { width, height } = canvas;

    for (let i = 0; i < INITIAL_OBJECT_AMOUNT; ++i) {
      const radius = Math.random() * MAX_OBjECT_RADIUS;
      this.canvas_objects.push({
        x: MAX_OBjECT_RADIUS + ((Math.random() * width) - (MAX_OBjECT_RADIUS * 2)),
        y: MAX_OBjECT_RADIUS + ((Math.random() * height) - (MAX_OBjECT_RADIUS * 2)),
        r: radius,
        m: (radius * radius) / 10, // squared radius for exponential mass
        vx: (Math.random() * 2) - 1, // -1 => 1
        vy: (Math.random() * 2) - 1, // -1 => 1
        range: radius * 5, // A limit to the gravitatiol range
      });
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
        const force = (gravitational_constant * obj.m * other_obj.m) / (dist * dist);
        obj.vx += (x_dis / dist) * force;
        obj.vy += (y_dis / dist) * force;
      }

      obj.x += obj.vx;
      obj.y += obj.vy;

      if (obj.x - obj.r < 0 || obj.x + obj.r > width) obj.vx *= -1
      if (obj.y - obj.r < 0 || obj.y + obj.r > height) obj.vy *= -1

      c.globalAlpha = 0.4;
      c.beginPath();
      c.arc(obj.x, obj.y, obj.r, 0, 2 * Math.PI);
		  c.fillStyle = '#add8e6';
      c.fill();
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

  onCanvasMouseMove(e) {
    this.mouse = this.getMousePos(e);
  }

  onCanvasMouseDown(e) {
    const radius = Math.random() * MAX_OBjECT_RADIUS;
    this.canvas_objects.push({
      x: this.mouse.x,
      y: this.mouse.y,
      r: radius,
      m: (radius * radius) / 10, // squared radius for exponential mass
      vx: (Math.random() * 2) - 1, // -1 => 1
      vy: (Math.random() * 2) - 1, // -1 => 1
      range: radius * 5, // A limit to the gravitatiol range
    });
  }

  render() {
    return (
      <Fragment>
        <Link to="/about">
          <div className={styles.info}>
            <div className={styles.name}>Ray Davidson</div>
            <div className={styles.title}>Software Developer</div>
            <div className={styles.disclaimer}>...and his obligatory canvas landing page</div>
          </div>
        </Link>
        <canvas
          ref={this.canvasRef}
          className={styles.canvas}
          onMouseDown={this.onCanvasMouseDown}
          onMouseMove={this.onCanvasMouseMove}
        />
      </Fragment>
    );
  }
}

export default Landing;
