#pragma strict

public var contains : String;
public var amount : float;
public var particles : ParticleSystem;


function OnCollisionEnter2D(coll: Collision2D) : void {

  var actorScript : ActorScript = coll.gameObject.GetComponent(ActorScript);

  if (actorScript) {
    actorScript.Add(contains, amount);
  }

  Instantiate(
    particles,
    transform.position,
    Quaternion(transform.rotation.x, transform.rotation.y, 0.0, 0)
  );

  Destroy(gameObject);

}