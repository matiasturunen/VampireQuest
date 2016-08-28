#pragma strict

public var zoomMin : float = 1.0;
public var zoomMax : float = 10.0;
public var zoomMod : float = 0.2;

public var cameraPrefab : Camera;

private var hudPanel : GameObject;
private var hudMessage : UnityEngine.UI.Text;
private var hudHealth : UnityEngine.UI.Text;
private var hudAmmo : UnityEngine.UI.Text;
private var hudPoints : UnityEngine.UI.Text;
private var hudKills : UnityEngine.UI.Text;

private var goPanel : GameObject;
private var goKills : UnityEngine.UI.Text;
private var goAmmo : UnityEngine.UI.Text;
private var goPoints : UnityEngine.UI.Text;
private var goHealth : UnityEngine.UI.Text;

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

  hudPanel = GameObject.Find('hud_panel');
  hudHealth = GameObject.Find('hud_health').GetComponent(UnityEngine.UI.Text);
  hudAmmo = GameObject.Find('hud_ammo').GetComponent(UnityEngine.UI.Text);
  hudMessage = GameObject.Find('hud_message').GetComponent(UnityEngine.UI.Text);
  hudKills = GameObject.Find('hud_kills').GetComponent(UnityEngine.UI.Text);
  hudPoints = GameObject.Find('hud_points').GetComponent(UnityEngine.UI.Text);

  goPanel = GameObject.Find('go_panel');
  goPoints = GameObject.Find('go_points').GetComponent(UnityEngine.UI.Text);
  goAmmo = GameObject.Find('go_ammo').GetComponent(UnityEngine.UI.Text);
  goHealth = GameObject.Find('go_health').GetComponent(UnityEngine.UI.Text);
  goKills = GameObject.Find('go_kills').GetComponent(UnityEngine.UI.Text);

  goPanel.SetActive(false);

  messageList = new Array();

}

function FixedUpdate() {

  if (playerObj == null) {
    if (hudPanel.active) {
      hudHealth.text = "0 /" + hudHealth.text.Split("/"[0])[1];
      gameOver();
    }
    return;
  }

  hudAmmo.text = player.ammo.ToString();
  hudKills.text = kills.ToString();
  hudPoints.text = points.ToString();
  hudHealth.text = player.health.ToString() + " / " + player.maxHealth.ToString();

  cameraObj.transform.position.x = playerObj.transform.position.x;
  cameraObj.transform.position.y = playerObj.transform.position.y;

  messageTimer -= Time.deltaTime;

  if (messageTimer < 0) {
    if (messageList.length > 0) {
      var message : MessageClass = messageList.Shift() as MessageClass; 
      hudMessage.text = message.text;
      messageTimer = message.lifeTime;
    } else if (hudMessage.text) {
      hudMessage.text = "";
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

function gameOver() {

  goKills.text = kills.ToString();
  goPoints.text = points.ToString();
  goHealth.text = hudHealth.text;
  goAmmo.text = hudAmmo.text;

  goPanel.SetActive(true);
  hudPanel.SetActive(false);

}
