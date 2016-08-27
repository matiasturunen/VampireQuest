#pragma strict
// common properties for all enemies
// add this script to all enemies

var MaxHealth: float = 100;  // max health of enemy
var DamageMax: float = 20;   // max damage that enemy can deal
var DamageMin: float = 15;   // min damage that enemy can deal
var speed: float = 2;        // movement speed
var deathParticles: ParticleSystem; // particles to show on death
var bloodAmount: float = 30; // Amount of blood contained in this enemy.
var points: int = 5; // number of points rewarded for killing this

var loot: GameObject[];     // items to drop on death

private var health: float = MaxHealth;
private var rigidBody: Rigidbody2D;

function Awake() {
  rigidBody = GetComponent(Rigidbody2D);
  health = MaxHealth;
}

function FixedUpdate() {
  MoveAround();
}

function Damage(amount: float) {
  if (amount < 0) {
    Debug.Log('Damage can\'t be negative!');
  } else {
    health -= amount;
    if (health <= 0) {
      Kill();
    }
  }
}

function Heal(amount: float) {
  if (amount < 0) {
    Debug.Log('Can\'t heal negative amount');
  } else {
    health += amount;
    if (health > MaxHealth) {
      health = MaxHealth;
    }
  }
}

private function DropLoot() {
  for (var i=0; i < loot.length; i++) {
    Instantiate(loot[i], transform.position, Quaternion.identity);
  }
}

private function Kill() {
  Debug.Log("Killed enemy (" + gameObject.ToString() + ")");

  // adding points when this is killed
  try {
    GameObject.FindWithTag("HUD").GetComponent(HUD).addPoints(points);
  } catch (err) {
    Debug.Log(err.ToString());
  }

  if (deathParticles) {
    Instantiate(
      deathParticles,
      transform.position,
      Quaternion(transform.rotation.x, transform.rotation.y, 0.0, 0)
    );
  }

  DropLoot();
  Destroy(gameObject);
}

private function MoveAround() {
  // move enemy towards player
  var playerObject = GameObject.FindWithTag('Player');
  if (playerObject) {
    var heading = (playerObject.transform.position - transform.position).normalized;
    var direction = heading.normalized;

    // look towards direction of movement
    transform.up = heading;
    // move
    rigidBody.velocity = Vector2.ClampMagnitude(direction * speed, speed);
  } else {
    // Dont move when there is no player around
    rigidBody.velocity = Vector2.zero;
  }
}


