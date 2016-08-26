#pragma strict

public var damage : float = 0; // vahinko mita tekee
public var ttl : float = 5; // elinaika
public var speed : float = 3; // nuolen nopeus
public var particles : ParticleSystem;

private var rigidBody : Rigidbody2D;


function Start() {

  rigidBody = GetComponent(Rigidbody2D);

  rigidBody.velocity = Vector2(
    transform.up.x * speed,
    transform.up.y * speed
  );

}

function FixedUpdate() {

  ttl -= Time.deltaTime;

  if (ttl < 0 ) {
    Destroy(gameObject);
  }

}

function OnCollisionEnter2D(coll: Collision2D) {

  // check if we hit a player
  var player : Player = coll.gameObject.GetComponent(Player);
  if (player) {
    player.ModHealth(damage * (-1));
  }

  // check if we hit an enemy
  var enemy: CommonEnemy = coll.gameObject.GetComponent(CommonEnemy);
  if (enemy) {
    enemy.Damage(damage);
  }

  // show collision particles and destroy the bolt
  Instantiate(particles, transform.position, Quaternion.identity);
  Destroy(gameObject);

}
