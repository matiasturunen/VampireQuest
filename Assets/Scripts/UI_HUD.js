#pragma strict

public var playerObject : GameObject;
public var healthSlider : UnityEngine.UI.Slider;
public var messageDisplay : UnityEngine.UI.Text;
public var ammoCountDisplay : UnityEngine.UI.Text;

private var player : Player;
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

  player = playerObject.GetComponent(Player);
  messageList = new Array();

  if (healthSlider) {
    healthSlider.minValue = 0.0;
    healthSlider.maxValue = player.maxHealth;
    healthSlider.value = player.health;
  }

}

function FixedUpdate() {

  healthSlider.value = player.health;
  ammoCountDisplay.text = player.ammo.ToString();

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
