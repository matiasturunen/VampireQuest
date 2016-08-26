#pragma strict
// common properties for all enemies
// add this script to all enemies

var MaxHealth: float = 100;  // max health of enemy
var DamageMax: float = 20;   // max damage that enemy can deal
var DamageMix: float = 15;   // min damage that enemy can deal
var speed: float = 2;        // movement speed
var deathParticles : ParticleSystem; // particles to show on death
var loot : GameObject[];     // items to drop on death

private var health = MaxHealth;

function Awake() {
  health = MaxHealth;
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

  if (deathParticles) {
    Instantiate(
      deathParticles,
      transform.position,
      Quaternion(transform.rotation.x, transform.rotation.y, 0.0, 0)
    );
  }

/*
  for (var i : int = loot.length - 1; i > -1; i--) {
    Instantiate(
      loot[i],
      transform.position,
      Quaternion(0.0, 0.0, 0.0, 0)
    );
  }*/
  DropLoot();

  Destroy(gameObject);
}
