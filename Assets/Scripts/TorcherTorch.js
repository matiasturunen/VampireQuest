#pragma strict

public var ttl: float = 5; // elinaika
public var particles: ParticleSystem;

private var damage: float = 0;
private var speed: float = 0;
private var rigidBody: Rigidbody2D;

function Awake() {
  rigidBody = GetComponent(Rigidbody2D);
}

function FixedUpdate() {
  ttl -= Time.deltaTime;

  if (ttl < 0 ) {
    Destroy(gameObject);
  }
}

function setVelocity(direction: Vector2) {
  rigidBody.velocity = Vector2.ClampMagnitude(direction * speed, speed);
}

function setProperties(damage: float, speed: float) {
  this.damage = damage;
  this.speed = speed;
}

function OnCollisionEnter2D(coll: Collision2D) {

  var player : Player = coll.gameObject.GetComponent(Player);
  if (player) {
    player.ModHealth(-damage);
  }

  // show collision particles and destroy the bolt
  if (particles) {
    Instantiate(particles, transform.position, Quaternion.identity);
  }
  
  Destroy(gameObject);

}
