#pragma strict

public var amount : int;
public var particles : ParticleSystem;


function OnCollisionEnter2D(coll: Collision2D) {

  var player : Player = coll.gameObject.GetComponent(Player);

  if (player) {
    player.AddAmmo(amount);
  }

  Instantiate( particles, transform.position, Quaternion.identity);
  Destroy(gameObject);
}
