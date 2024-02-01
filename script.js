// Fetch the canvas from the DOM
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Alias some Matter.js modules
const Engine = Matter.Engine,
      Render = Matter.Render,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Vertices = Matter.Vertices;

// Create an engine
const engine = Engine.create();

// Create a renderer
const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false // Needed for colors
    }
});

// Create a circle (ball) with red color and modified properties for 'floating'
const circle = Bodies.circle(400, 100, 40, { 
    restitution: 0.5,
    render: {
        fillStyle: 'red' // Ball color
    },
    mass: 0.001, // Decrease mass to 5% of its original
    frictionAir: 0.2 // Increase air friction to make it 'float' more
});


// Create a triangle
const triangle = Bodies.fromVertices(400, 300, Vertices.fromPath('40 0, 80 60, 0 60'), {
    restitution: 0.5,
    render: {
        fillStyle: 'red' // Triangle color
    }
}, true);

// Create a ground
const ground = Bodies.rectangle(400, 580, 810, 40, { isStatic: true });

// Create left and right walls
const leftWall = Bodies.rectangle(0, 300, 40, 600, { isStatic: true });
const rightWall = Bodies.rectangle(800, 300, 40, 600, { isStatic: true });

// Add the circle, triangle, ground, and walls to the world
World.add(engine.world, [circle, triangle, ground, leftWall, rightWall]);

// Run the engine
Engine.run(engine);

// Run the renderer
Render.run(render);

// Listen for keydown events
document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowUp') {
        // Apply an upward force to the triangle, tripled
        Body.applyForce(triangle, triangle.position, { x: 0, y: -0.03 * triangle.mass });
    } else if (event.code === 'ArrowLeft') {
        // Apply a leftward force to the triangle, tripled
        Body.applyForce(triangle, triangle.position, { x: -0.03 * triangle.mass, y: 0 });
    } else if (event.code === 'ArrowRight') {
        // Apply a rightward force to the triangle, tripled
        Body.applyForce(triangle, triangle.position, { x: 0.03 * triangle.mass, y: 0 });
    }
});

 