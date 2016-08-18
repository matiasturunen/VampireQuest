#pragma strict

private var particles : ParticleSystem;


function Start() : void {

  particles = GetComponent(ParticleSystem);
  particles.GetComponent(Renderer).sortingLayerName = "Player";

}

function FixedUpdate() : void {

  if (particles.IsAlive() == false) {
    Destroy(gameObject);
  }

}