#pragma strict

public var damage : float = 0; // vahinko mita tekee
public var ttl : float = 5; // elinaika
public var speed : float = 3; // nuolen nopeus
public var particles : ParticleSystem;

private var rigidBody : Rigidbody2D;


function Start() : void {

  rigidBody = GetComponent(Rigidbody2D);

  rigidBody.velocity = Vector2(
    transform.up.x * speed,
    transform.up.y * speed
  );

}

function FixedUpdate() : void {

  ttl -= Time.deltaTime;

  if (ttl < 0 ) {
    Destroy(gameObject);
  }

}

function OnCollisionEnter2D(coll: Collision2D) : void {

  var actorScript : ActorScript = coll.gameObject.GetComponent(ActorScript);

  if (actorScript) {
    actorScript.Damage(damage);
  }

  Instantiate(
    particles,
    transform.position,
    Quaternion(transform.rotation.x, transform.rotation.y, 0.0, 0)
  );

  ttl = -1;

}
