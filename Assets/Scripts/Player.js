#pragma strict

public var health : float = 0;
public var maxHealth : float = 100;
public var ammo : int = 10;
public var healthDrainSpeed: float = 1;  // remove amount of HP from player every N seconds
public var healthDrainAmount: float = 1; // amount of HP to remove over time
public var bloodDrinkingSpeed: float = 5;
public var reloadTime: float = 0.2;

public var projectile : GameObject;
public var deathParticles : ParticleSystem;
public var loot : GameObject[];

public var reloadSound: AudioClip;
public var fireSound: AudioClip;
private var audioSource: AudioSource;

private var hud : HUD;
private var animator : Animator;
private var rigidBody : Rigidbody2D;
private var nextHealthDrainTime: float = healthDrainSpeed;
private var nextBloodDrinkTime: float = 1;
private var nextBoltFireTime: float = 0;


function Start() {
  rigidBody = GetComponent(Rigidbody2D);
  animator = GetComponent(Animator);

  audioSource = GetComponent(AudioSource);
  audioSource.playOnAwake = false;

  hud = GameObject.Find("HUD").GetComponent(HUD);

  if (health <= 0) {
    health = maxHealth;
  }
}

function FixedUpdate() {
  Animate();
  DrainHealth();
  CheckForDeath();
}

private function DrainHealth() {
  if (Time.time > nextHealthDrainTime) {
    health -= healthDrainAmount;
    nextHealthDrainTime = Time.time + healthDrainSpeed;
  }
}

private function Animate() {
  if (rigidBody && animator) {
    if (rigidBody.velocity != Vector2.zero) {
      animator.SetTrigger("move");
    } else {
      animator.SetTrigger("stop");
    }
  }
}

private function CheckForDeath() {
  if (health <= 0) {
    Kill();
  } else if (health > maxHealth) {
    health = maxHealth;
  }
}

function Kill() {

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

  if (mod < 0) {
    hud.Message("Received " + (mod * (-1)).ToString() + " damage...");
  } else {
    hud.Message("Restored " + mod.ToString() + " health...");
  }
}

function AddAmmo(amount : int) {
  ammo += amount;
  hud.Message("Added " + amount.ToString() + " ammo...");
}

private function playClip(clip: AudioClip, loop: boolean, volume: float) {
  audioSource.clip = clip;
  audioSource.loop = loop;
  audioSource.volume = volume;
  audioSource.Play();
}

function FireWeapon() {
  if (Time.time > nextBoltFireTime) {
    nextBoltFireTime = Time.time + reloadTime;
    if (ammo > 0) {
      ammo -= 1;
      var spawnPos : Vector3 = Vector3(
        transform.position.x + transform.up.x * 1.1,
        transform.position.y + transform.up.y * 1.1,
        0
      );
      Instantiate(projectile, spawnPos, transform.rotation);

      // play sounds
      playClip(fireSound, false, 0.6);
      yield WaitForSeconds(audioSource.clip.length);
      playClip(reloadSound, false, 0.4);
    }

    Debug.Log("Fire, actor (" + gameObject.ToString() + "), ammo remains (" + ammo.ToString() + ")");
  }
}

function OnTriggerStay2D(coll: Collider2D) {
  if (coll.gameObject.tag == 'BloodPool') {
    if (Time.time > nextBloodDrinkTime) {
      var pool: BloodPool = coll.gameObject.GetComponent(BloodPool);
      ModHealth(pool.DrainPool(bloodDrinkingSpeed));

      nextBloodDrinkTime = Time.time + 1; // can drink once every second
    }
  }
}
