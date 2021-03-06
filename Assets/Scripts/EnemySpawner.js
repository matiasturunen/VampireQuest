#pragma strict
// spawn enemies around player

var spawnRadiusMin: float = 15;
var spawnRadiusMax: float = 20;

var Waves: Wave[];

private var playerObject: GameObject;
private var currentWave: int = 0;
private var enemiesSpawned: int = 0;
private var spawning: boolean = false;

public class WaveEnemy {
  public var name: String;
  public var delay: float;
  public var enemyType: GameObject;
  public var spawnAmount: int;
  public var message: String;
}

public class Wave {
  public var name: String;
  public var WaveEnemies: WaveEnemy[];
}

function Start () {
  playerObject = GameObject.FindWithTag('Player');
}

function FixedUpdate() {
  if (spawning == false) {
    // we are not currently spawning more enemies
    var enemiesInField = GameObject.FindGameObjectsWithTag('Enemy').length;
    //Debug.Log('Enemy count ' + enemiesInField);
    if (enemiesInField == 0) {
      spawning = true;
      SpawnWave(currentWave);
      currentWave += 1;
    }
  }
}

private function randomPoint() {
  var point: Vector2 = Random.insideUnitCircle;
  var randomized = Random.Range(spawnRadiusMin, spawnRadiusMax) * point;

  return randomized + playerObject.transform.position;
}

private function isValidSpawnpoint(point: Vector2) {
  var collidersInPoint = Physics2D.OverlapPointAll(point);
  for (var coll: Collider2D in collidersInPoint) {
    // put rules for valid point here
    if (coll.gameObject.tag == 'obstacle') {
      return false;
    }

    // Spawnpoint is inside gamefield, assuming that it is named as 'TileMasterFiled'
    if (coll.gameObject.transform.parent.transform.parent.name == 'TileMasterField') {
      Debug.Log('Thats great place to spawn at ' + coll.gameObject.transform.parent.transform.parent.name);
      return false;
    }

  }
  return true;
}

private function getSpawnPoint() {


  var spawnPoint = randomPoint();
  while (!isValidSpawnpoint(spawnPoint)) {
    spawnPoint = randomPoint();
  }

  return spawnPoint;
}

private function SpawnWave(waveNum: int) {
  if (waveNum >= Waves.length) {
    Debug.Log('Invalid wave');
    return;
  }
  // find player current position again
  playerObject = GameObject.FindWithTag('Player');

  // spawn enemies
  var waveEnemies = Waves[waveNum].WaveEnemies;

  for (var enemy: WaveEnemy in waveEnemies) {
    if (enemy.delay > 0) {
      yield WaitForSeconds(enemy.delay);
    }

    if (enemy.message != '') {
      // TODO: show message
    }

    if (enemy.enemyType && enemy.spawnAmount > 0) {
      for (var i = 0; i < enemy.spawnAmount; i++) {
        Instantiate(enemy.enemyType, getSpawnPoint(), Quaternion.identity);
      }
    }
  }
  spawning = false;
}
