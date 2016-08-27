#pragma strict

public var amount : int;
public var particles : ParticleSystem;


function OnTriggerEnter2D(coll: Collider2D) {

  var player : Player = coll.gameObject.GetComponent(Player);

  if (player) {
    player.AddAmmo(amount);
    Instantiate( particles, transform.position, Quaternion.identity);
    Destroy(gameObject);
  }

}
