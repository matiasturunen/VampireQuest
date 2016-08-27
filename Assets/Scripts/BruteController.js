#pragma strict
// Put special attacks (ie. ranged) and other things specific to this enemy here

var attackDelay: float = 1;

private var rigidBody: Rigidbody2D;
private var animator: Animator;
private var controller: CommonEnemy;
private var playerCollisionTime: float = 0;
private var nextAttackTime: float = 0;

function Awake() {
  controller = GetComponent(CommonEnemy);
  rigidBody = GetComponent(Rigidbody2D);
  animator = GetComponent(Animator);
}

function Update() {
  AnimateMovement();
}

private function AnimateMovement() {
  if (rigidBody && animator) {
    if (rigidBody.velocity != Vector2.zero) {
      animator.SetTrigger('move');
    } else {
      animator.SetTrigger('stop');
      Debug.Log('Stopped Brute');
    }
  }
}

private function Attack(player: Player) {
  // Animate attacking
  animator.SetTrigger('attack');

  // Deal damage to player
  var damage = Mathf.Ceil(Random.Range(controller.DamageMin, controller.DamageMax));
  player.ModHealth(-damage);

}

function OnTriggerEnter2D(coll: Collider2D) {
  var player: Player = coll.gameObject.GetComponent(Player);
  if (player) {
    // we came close to player. Save time so we can use it later
    playerCollisionTime = Time.time;
  }
}

function OnTriggerStay2D(coll: Collider2D) {
  var player: Player = coll.gameObject.GetComponent(Player);
  if (player) {
    if (playerCollisionTime + attackDelay < Time.time && Time.time > nextAttackTime) {
      // we have been in contact with player long enough and can attack again
      nextAttackTime = Time.time + attackDelay;
      Attack(player);
    }
  }
}

function OnTriggerExit2D(coll: Collider2D) {
  var player: Player = coll.gameObject.GetComponent(Player);
  if (player) {
    // no longer close to player. Reset timer
    playerCollisionTime = 0;
  }
}
