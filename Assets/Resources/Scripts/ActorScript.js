#pragma strict

public var health : float = 0;
public var projectile : GameObject;
public var deathParticles : ParticleSystem;

function Start() : void {

  // GetComponent(Rigidbody2D)

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

function FireWeapon() {

  var spawnPos : Vector3 = Vector3(
    transform.position.x + transform.up.x,
    transform.position.y + transform.up.y,
    0
  );

  Instantiate(projectile, spawnPos, transform.rotation);

}

/*
function ModHealth (mod : float) {
	var h : float = this.health + mod;
	Debug.Log("health --> " + h.ToString());
	if (h > 0) {
		this.health = h;
	} else {
		this.KillActor();
	}
}

function KillActor () {
	Debug.Log("DESTROY");
	GameObject.Destroy(gameObject);
}

function OnCollisionEnter2D(coll: Collision2D) {
	Debug.Log("AAAAAAAAAAA");
	var colObject : GameObject = coll.gameObject;
	if (colObject.tag == "Projectile" || colObject.tag == "Weapon") {
		Debug.Log(colObject.ToString() + " hit with a weapon", gameObject);
		this.ModHealth(colObject.GetComponent(WeaponScript).GetDamage() * (-1));
	}
}
*/