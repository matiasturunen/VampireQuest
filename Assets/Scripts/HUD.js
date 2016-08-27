#pragma strict

public var zoomMin : float = 1.0;
public var zoomMax : float = 10.0;
public var zoomMod : float = 0.2;

public var cameraPrefab : Camera;

private var txtMessage : UnityEngine.UI.Text;
private var txtHealth : UnityEngine.UI.Text;
private var txtAmmo : UnityEngine.UI.Text;

private var cameraObj : Camera;
private var playerObj : GameObject;

private var player : Player;    // player behavior script
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

  playerObj = GameObject.FindWithTag('Player');
  cameraObj = Instantiate(cameraPrefab);

  cameraObj.tag = "MainCamera";

  player = playerObj.GetComponent(Player);

  txtHealth = GameObject.Find('txt_health').GetComponent(UnityEngine.UI.Text);
  txtAmmo = GameObject.Find('txt_ammo').GetComponent(UnityEngine.UI.Text);
  txtMessage = GameObject.Find('txt_message').GetComponent(UnityEngine.UI.Text);

  messageList = new Array();

}

function FixedUpdate() {

  txtAmmo.text = player.ammo.ToString();
  txtHealth.text = player.health.ToString() + " / " + player.maxHealth.ToString();

  cameraObj.transform.position.x = playerObj.transform.position.x;
  cameraObj.transform.position.y = playerObj.transform.position.y;

  messageTimer -= Time.deltaTime;

  if (messageTimer < 0) {
    if (messageList.length > 0) {
      var message : MessageClass = messageList.Shift() as MessageClass; 
      txtMessage.text = message.text;
      messageTimer = message.lifeTime;
    } else if (txtMessage.text) {
      txtMessage.text = "";
    }
  }

  var mouseWheel : float = Input.GetAxis("Mouse ScrollWheel");

  if (mouseWheel < 0 && cameraObj.orthographicSize < zoomMax) {
    cameraObj.orthographicSize += zoomMod;
  } else if (mouseWheel > 0 && cameraObj.orthographicSize > zoomMin) {
    cameraObj.orthographicSize -= zoomMod;
  }

}

function Message(msg : String) {

  Message(msg, 4.0);

}

function Message(msg : String, time : float) {

  messageList.Push(new MessageClass(msg, time));

}
