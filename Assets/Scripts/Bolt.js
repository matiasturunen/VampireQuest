#pragma strict
//@script RequireComponent(AudioSource)

public var damage : float = 0; // vahinko mita tekee
public var ttl : float = 5; // elinaika
public var speed : float = 3; // nuolen nopeus
public var particles : ParticleSystem;

public var enemyHitSound: AudioClip;
private var audioSource: AudioSource;

private var rigidBody : Rigidbody2D;

function Start() {

  rigidBody = GetComponent(Rigidbody2D);
  audioSource = GetComponent(AudioSource);
  audioSource.playOnAwake = false;

  rigidBody.velocity = Vector2(
    transform.up.x * speed,
    transform.up.y * speed
  );

}

function FixedUpdate() {

  ttl -= Time.deltaTime;

  if (ttl < 0 ) {
    Destroy(gameObject);
  }

}

function OnCollisionEnter2D(coll: Collision2D) {

  // show collision particles
  Instantiate(particles, transform.position, Quaternion.identity);

  // hide it
  GetComponent(SpriteRenderer).enabled = false;

  // check if we hit a player. If you somehow can run in front of this bolt, you can damage yourself
  var player : Player = coll.gameObject.GetComponent(Player);
  if (player) {
    player.ModHealth(damage * (-1));
  }

  // check if we hit an enemy
  var enemy: CommonEnemy = coll.gameObject.GetComponent(CommonEnemy);
  if (enemy) {
    enemy.Damage(damage);
    
    // play sound
    if (audioSource && enemyHitSound) {
      Debug.Log('Playsound');
      audioSource.clip = enemyHitSound;
      audioSource.Play();

      // wait for clip to finish
      yield WaitForSeconds(audioSource.clip.length);
    }
  }



  Destroy(gameObject);

}
