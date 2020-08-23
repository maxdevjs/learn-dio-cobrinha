let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')

let score = 0;
let box = 32
let snake = []

const food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

snake[0] = {
  x: 8 * box,
  y: 8 * box
}
let direction = 'right'

const createBG = () => {
  context.fillStyle = 'lightgreen'
  context.fillRect(0, 0, 16 * box, 16 * box)
}

const createGrid = () => {
  context.strokeStyle = 'green'
  for (let x = box; x < 16 * box; x += box) {
    context.beginPath()
    context.moveTo(x, 0)
    context.lineTo(x, 16 * box)
    context.stroke()
    for (let y = box; y < 16 * box; y += box) {
    context.beginPath()
    context.moveTo(0, y)
    context.lineTo(16 * box, y)
    context.stroke()
    }
  }
}

const createSnake = () => {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = 'green'
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

const createFood = () => {
  context.fillStyle = 'red'
  context.fillRect(food.x, food.y, box, box)
}

const update = (e) => {
  // 37: left
  if (event.keyCode === 37 && direction != 'right') direction = 'left'
  // 38: up
  if (event.keyCode === 38 && direction != 'down') direction = 'up'
  // 39: right
  if (event.keyCode === 39 && direction != 'left') direction = 'right'
  // 40: down
  if (event.keyCode === 40 && direction != 'up') direction = 'down'
}

document.addEventListener('keydown', update)

const initGame = () => {

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i]. x && snake[0].y === snake[i].y) {
      clearInterval(game)
      console.log("Game Over");
    }
  }

  if (snake[0].x > 15 * box && direction === 'right') snake[0].x = 0
  if (snake[0].x < 0 && direction === 'left') snake[0].x = 15 * box
  if (snake[0].y > 15 * box && direction === 'down') snake[0].y = 0
  if (snake[0].y < 0 && direction === 'up') snake[0].y = 15 * box

  createBG()
  createGrid()
  createSnake()
  createFood()

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (direction === 'right') snakeX += box
  if (direction === 'left') snakeX -= box
  if (direction === 'up') snakeY -= box
  if (direction === 'down') snakeY += box

  if (snakeX !== food.x || snakeY !== food.y) {
    snake.pop()
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box
    food.y = Math.floor(Math.random() * 15 + 1) * box
    
    console.log(++score);
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

let game = setInterval(initGame, 200)

