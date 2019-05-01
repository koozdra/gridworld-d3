const { times, map, join, nth, flow, sum, identity } = _;

const forEachGridPoint = (width, height, f) => {
  times(y =>
    times(x => {
      f(x, y);
    })(height)
  )(width);
};

const initialGridWorld = (width, height) => {
  const world = [];

  forEachGridPoint(width, height, (x, y) => {
    world[x] = world[x] || [];
    world[x][y] = 0;
  });

  return {
    world,
    width,
    height
  };
};

const policy = data => (state, action) => {};

const actions = [[-1, 0], [0, -1], [1, 0], [0, 1]];

function run() {
  const worldWidth = 4;
  const worldHeight = 4;
  const { world: gridWorld } = initialGridWorld(worldWidth, worldHeight);

  console.log(gridWorld);

  const canvasWidth = 600;
  const canvasHeight = 600;

  const gridWidth = canvasWidth / worldWidth;
  const gridHeight = canvasHeight / worldHeight;

  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight);

  svg
    .selectAll("rect")
    .data(gridWorld)
    .enter()
    .append("g")
    .attr("transform", (d, i) => "translate(" + i * gridWidth + ")")
    .selectAll("rect")
    .data(identity)
    .enter()
    .append("rect")
    .attr("fill", "teal")
    .attr("height", gridHeight)
    .attr("width", gridWidth)
    .attr("y", (d, i) => i * gridHeight)
    .attr("x", 0);
}
