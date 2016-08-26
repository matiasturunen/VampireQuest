#pragma strict
// script specific to forkEnemy
// Put special attacks (ie. ranged) and other things specific to this enemy here

private var controller: CommonEnemy;

function Awake() {
  controller = GetComponent(CommonEnemy);
}

function OnCollisionEnter2D(coll: Collision2D) {

  var player: Player = coll.gameObject.GetComponent(Player);
  if (player) {
    // Deal damage to player
    var damage = Mathf.Ceil(Random.Range(controller.DamageMin, controller.DamageMax));
    player.ModHealth(-damage);
  }
}
