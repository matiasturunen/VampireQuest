﻿#pragma strict
// common properties for all enemies
// add this script to all enemies

var MaxHealth: float = 100;  // max health of enemy
var DamageMax: float = 20;   // max damage that enemy can deal
var DamageMix: float = 15;   // min damage that enemy can deal
var speed: float = 2;        // movement speed
var deathParticles: ParticleSystem; // particles to show on death
var bloodAmount: float = 30; // Amount of blood contained in this enemy.
var wanderingFactor: float = 0.2;   // how much should this enemy wander around instead of walking straight to player. Setting this to 1 may not be a good idea

var loot: GameObject[];     // items to drop on death

private var health: float = MaxHealth;
private var rigidBody: Rigidbody2D;

function Awake() {
  rigidBody = GetComponent(Rigidbody2D);
  health = MaxHealth;

  if (wanderingFactor < 0) {
    wanderingFactor = 0;
  } else if (wanderingFactor > 1) {
    wanderingFactor = 1;
  }
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
  var heading = playerObject.transform.position - transform.position;
  var distance = heading.magnitude;
  var direction = heading.normalized;

  // look towards direction of movement
  transform.up = heading;
  // move
  rigidBody.velocity = Vector2.ClampMagnitude(direction * speed, speed);
}
