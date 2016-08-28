#pragma strict

public var zoomMin : float = 1.0;
public var zoomMax : float = 10.0;
public var zoomMod : float = 0.2;

public var cameraPrefab : Camera;

private var txtMessage : UnityEngine.UI.Text;
private var txtHealth : UnityEngine.UI.Text;
private var txtAmmo : UnityEngine.UI.Text;
private var txtPoints : UnityEngine.UI.Text;
private var txtKills : UnityEngine.UI.Text;

private var cameraObj : Camera;
private var playerObj : GameObject;

private var player : Player;    // player behavior script
private var messageTimer : float;
private var messageList : Array;

private var points : int = 0;
private var kills : int = 0;

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
  txtKills = GameObject.Find('txt_kills').GetComponent(UnityEngine.UI.Text);
  txtPoints = GameObject.Find('txt_points').GetComponent(UnityEngine.UI.Text);

  messageList = new Array();

}

function FixedUpdate() {

  if (playerObj == null) {
    return;
  }

  txtAmmo.text = player.ammo.ToString();
  txtKills.text = kills.ToString();
  txtPoints.text = points.ToString();
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

function addPoints(amount : int) {
  addPoints(amount, true);
}

function addPoints(amount : int, isKill : boolean) {

  if (isKill == true) {
    kills += 1;
  }

  points += amount;

}

function getPoints() : int {
  return points;
}
