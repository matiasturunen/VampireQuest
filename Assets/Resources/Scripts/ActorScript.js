#pragma strict

public var health : float = 0;
public var maxHealth : float = 100;
public var ammo : int = 10;

public var projectile : GameObject;
public var deathParticles : ParticleSystem;
public var loot : GameObject[];

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

  Debug.Log("Damage, actor (" + gameObject.ToString() + "), amount (" + amount.ToString() + ")");
  ModHealth(amount * (-1));

}

function Kill() : void {

  Debug.Log("Kill, actor (" + gameObject.ToString() + ")");

  if (deathParticles) {
    Instantiate(
      deathParticles,
      transform.position,
      Quaternion(transform.rotation.x, transform.rotation.y, 0.0, 0)
    );
  }

  for (var i : int = loot.length - 1; i > -1; i--) {
    Instantiate(
      loot[i],
      transform.position,
      Quaternion(0.0, 0.0, 0.0, 0)
    );
  }

  Destroy(gameObject);

}

function ModHealth(mod : float) {

  health += mod;

  if (health < 0) {
    Kill();
  } else if (health > maxHealth) {
    health = maxHealth;
  }

}


function Add(what : String, amount : float) : void {

  Debug.Log("Add, actor (" + gameObject.ToString() + "), amount (" + amount.ToString() + ")");

  if (what == "health") {
    ModHealth(amount);
  } else if (what == "ammo") {
    ammo += amount;
  }

}

function FireWeapon() : void {

  if (ammo > 0) {
    ammo -= 1;
    var spawnPos : Vector3 = Vector3(
      transform.position.x + transform.up.x * 1.1,
      transform.position.y + transform.up.y * 1.1,
      0
    );
    Instantiate(projectile, spawnPos, transform.rotation);
  }

  Debug.Log("Fire, actor (" + gameObject.ToString() + "), ammo remains (" + ammo.ToString() + ")");

}

