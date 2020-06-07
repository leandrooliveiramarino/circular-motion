import { randomIntBetween } from '../helpers';

export default class Circle {
  constructor(context, props, events) {
    this.context = context;
    this.innerWidth = props.innerWidth;
    this.innerHeight = props.innerHeight;
    this.mouseMove = events.mouseMove;
    this.x = props.x;
    this.y = props.y;
    this.originalX = props.x;
    this.originalY = props.y;
    this.radius = props.radius;
    this.lastMousePoint = {
      x: props.x,
      y: props.y,
    };

    this._init();
  }

  _init() {
    this.circles = [];
    this.velocity = {
      x: 0.05,
      y: 0.05,
    };
    this._setOriginalColor();
    this.color = this._originalColor;
    this.opacity = 1;
    this.radians = Math.random() * Math.PI * 2;
    this.distanceFromCenter = randomIntBetween(50, 120);
  }

  _draw(lastPoint) {
    this.context.beginPath();
    this.context.strokeStyle = `rgb(${this.color})`;
    this.context.lineWidth = this.radius;
    this.context.moveTo(lastPoint.x, lastPoint.y);
    this.context.lineTo(this.x, this.y);
    this.context.stroke();
    this.context.closePath();
  }

  update() {
    const lastPoint = {
      x: this.x,
      y: this.y,
    };
    this._setBehavior();
    this._draw(lastPoint);
  }

  _actionConditions() {
    const actions = [];

    // if (this.x + this.radius > this.innerWidth) {
    //   actions.push('INVERT_X_DIRECTION');
    // }

    // if (this.x - this.radius < 0) {
    //   actions.push('INVERT_X_DIRECTION');
    // }

    // if (this.y + this.radius > this.innerHeight) {
    //   actions.push('INVERT_Y_DIRECTION');
    // }

    // if (this.y - this.radius < 0) {
    //   actions.push('INVERT_Y_DIRECTION');
    // }

    // if (
    //   this.mouseMove.x - this.x < 150 &&
    //   this.mouseMove.x - this.x > -150 &&
    //   this.mouseMove.y - this.y < 150 &&
    //   this.mouseMove.y - this.y > -150
    // ) {
    //   actions.push('INCREASE_OPACITY');
    // }

    // if (!actions.includes('INCREASE_OPACITY') && this.opacity > 0) {
    //   actions.push('DECREASE_OPACITY');
    // }

    actions.push('MOVE');

    return actions;
  }

  _setBehavior() {
    const actions = this._actionConditions();

    actions.forEach((action) => {
      this._actions(action)();
    });
  }

  _setOriginalColor() {
    this.COLORS_AVAILABLE = [
      '128, 17, 0',
      '182, 34, 3',
      '215, 53, 2',
      '252, 100, 0',
      '255, 117, 0',
      '250, 192, 0',
    ];

    this._originalColor = this.COLORS_AVAILABLE[
      Math.floor(Math.random() * this.COLORS_AVAILABLE.length)
    ];
  }

  _actions(action) {
    const _actions = {
      INVERT_X_DIRECTION: () => {
        this.velocity.x = this.velocity.x * -1;
      },
      INVERT_Y_DIRECTION: () => {
        this.velocity.y = this.velocity.y * -1;
      },
      SET_OPACITY: () => {
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.strokeStyle = this.color;
        this.context.stroke();
      },
      MOVE: () => {
        this.radians += this.velocity.x;

        this.lastMousePoint.x +=
          (this.mouseMove.x - this.lastMousePoint.x) * 0.05;

        this.lastMousePoint.y +=
          (this.mouseMove.y - this.lastMousePoint.y) * 0.05;

        this.x =
          this.lastMousePoint.x +
          Math.cos(this.radians) * this.distanceFromCenter;
        this.y =
          this.lastMousePoint.y +
          Math.sin(this.radians) * this.distanceFromCenter;
      },
    };

    if (!_actions[action]) {
      throw new Error('Action not available: ' + action);
    }

    return _actions[action];
  }
}
