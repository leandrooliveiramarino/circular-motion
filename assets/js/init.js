import Circle from './objects/Circle';
import { context, innerWidth, innerHeight } from './base';
import { mouseMove } from './events/mouseMove';
import { generateRandomPosition, randomIntBetween } from './helpers';

const circles = [];

for (let i = 0; i < 50; i++) {
  const position = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  circles.push(
    new Circle(
      context,
      { innerWidth, innerHeight, ...position, radius: randomIntBetween(3, 2) },
      { mouseMove }
    )
  );
}

function animate() {
  context.fillStyle = 'rgba(255, 255, 255, 0.05)';
  context.fillRect(0, 0, innerWidth, innerHeight);
  requestAnimationFrame(animate);
  circles.forEach((circle) => circle.update(circles));
}

animate();
