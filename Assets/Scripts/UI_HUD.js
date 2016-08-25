#pragma strict

public var player : GameObject;
public var healthSlider : UnityEngine.UI.Slider;
public var messageDisplay : UnityEngine.UI.Text;
public var ammoCountDisplay : UnityEngine.UI.Text;

private var playerActorScript : Actor;
private var messageTimer : float;
private var messageList : Array;


private class MessageClass {

  public var text : String;
  public var lifeTime : float;

  function MessageClass(m : String, t : float) {
    text = m;
    lifeTime = t;
  }

}


function Start() {

  playerActorScript = player.GetComponent(Actor);
  messageList = new Array();

  if (healthSlider) {
    healthSlider.minValue = 0.0;
    healthSlider.maxValue = playerActorScript.maxHealth;
    healthSlider.value = playerActorScript.health;
  }

}

function FixedUpdate() {

  healthSlider.value = playerActorScript.health;
  ammoCountDisplay.text = playerActorScript.ammo.ToString();

  messageTimer -= Time.deltaTime;

  if (messageTimer < 0) {
    if (messageList.length > 0) {
      var message : MessageClass = messageList.Shift() as MessageClass; 
      messageDisplay.text = message.text;
      messageTimer = message.lifeTime;
    } else if (messageDisplay.text) {
      messageDisplay.text = "";
    }
  }

}


function Message(msg : String) {

  Message(msg, 4.0);

}

function Message(msg : String, time : float) {

  messageList.Push(new MessageClass(msg, time));

}
