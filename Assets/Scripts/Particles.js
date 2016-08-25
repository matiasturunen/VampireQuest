#pragma strict

private var particles : ParticleSystem;


function Start() {

  particles = GetComponent(ParticleSystem);
  particles.GetComponent(Renderer).sortingLayerName = "Player";

}

function FixedUpdate() {

  if (particles.IsAlive() == false) {
    Destroy(gameObject);
  }

}