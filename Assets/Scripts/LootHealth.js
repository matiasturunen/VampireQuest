#pragma strict

public var amount : float;
public var particles : ParticleSystem;


function OnCollisionEnter2D(coll: Collision2D) {

  var actorScript : Actor = coll.gameObject.GetComponent(Actor);

  if (actorScript) {
    actorScript.ModHealth(amount);
  }

  Instantiate(
    particles,
    transform.position,
    Quaternion(transform.rotation.x, transform.rotation.y, 0.0, 0)
  );

  Destroy(gameObject);

}