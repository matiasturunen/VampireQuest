#pragma strict
// spawn enemies around player

var spawnRadiusMin: float = 5;
var spawnRadiusMax: float = 7;

var ForkEnemy: GameObject;
var FastEnemy: GameObject;
var FatEnemy: GameObject;
var RangedEnemy: GameObject;

var enemiesInWave: int = 5;

private var playerObject: GameObject;
private var currentWave: int = 0;
private var enemiesSpawned: int = 0;
private var spawning: boolean = false;

function Start () {
  playerObject = GameObject.FindWithTag('Player');
}

function FixedUpdate() {
  if (spawning == false) {
    // we are not currently spawning more enemies
    var enemiesInField = GameObject.FindGameObjectsWithTag('Enemy').length;
    Debug.Log('Enemy count ' + enemiesInField);
    if (enemiesInField == 0) {
      currentWave += 1;
      spawning = true;
      SpawnWave(currentWave);
    }
  }
}

private function getSpawnPoint() {
  var point: Vector2 = Random.insideUnitCircle;
  var randomized = Random.Range(spawnRadiusMin, spawnRadiusMax) * point;

  return randomized + playerObject.transform.position;
}

private function SpawnWave(waveNum: int) {
  // find player current position
  playerObject = GameObject.FindWithTag('Player');

  // spawn enemies
  for (var i = 0; i < waveNum * enemiesInWave; i++) {
    Instantiate(ForkEnemy, getSpawnPoint(), Quaternion.identity);
    enemiesSpawned++;
  }
  spawning = false;
}
