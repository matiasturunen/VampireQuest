#pragma strict

public var player : GameObject;
public var healthSlider : UnityEngine.UI.Slider;

private var playerActorScript : ActorScript;


function Start() : void {

  playerActorScript = player.GetComponent(ActorScript);

  if (healthSlider) {
    healthSlider.minValue = 0.0;
    healthSlider.maxValue = playerActorScript.maxHealth;
    healthSlider.value = playerActorScript.health;
  }

}

function FixedUpdate() : void {

  healthSlider.value = playerActorScript.health;

}