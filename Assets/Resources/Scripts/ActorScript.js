#pragma strict

public var health : float = 0;
public var projectile : GameObject;
public var deathParticles : ParticleSystem;

private var animator : Animator;
private var rigidBody : Rigidbody2D;

function Start() : void {

  rigidBody = GetComponent(Rigidbody2D);
  animator = GetComponent(Animator);

}

function FixedUpdate() : void {

  if (rigidBody && animator) {
    if (rigidBody.velocity != Vector2.zero) {
      animator.SetTrigger("move");
    } else {
      animator.SetTrigger("stop");
    }
  }

}

function Damage(amount : float) : void {

  health -= amount;

  if (health < 0) {
    Kill();
  }

}

function Kill() : void {

  Destroy(gameObject);

  if (deathParticles) {
    Instantiate(
      deathParticles,
      transform.position,
      Quaternion(transform.rotation.x, transform.rotation.y, 0.0, 0)
    );
  }

}

function FireWeapon() : void {

  var spawnPos : Vector3 = Vector3(
    transform.position.x + transform.up.x * 1.1,
    transform.position.y + transform.up.y * 1.1,
    0
  );

  Instantiate(projectile, spawnPos, transform.rotation);

}
