#pragma strict

public var speed : float = 3; // nopeus, voi muokata editorissa
public var cameraPrefab : Camera; // kamera - prefab

private var rigidBody : Rigidbody2D; // rigidbody2d
private var player : Player;
private var cameraObj : Camera;


function Start() {

  rigidBody = GetComponent(Rigidbody2D);
  player = GetComponent(Player);
  cameraObj = Instantiate(cameraPrefab);

}

function FixedUpdate() {
  // look towards mouse pointer
  var mousePos : Vector2 = cameraObj.ScreenToWorldPoint(Input.mousePosition);
  var heading : Vector2 = (mousePos - transform.position).normalized;
  transform.up = heading;

  if (Input.GetAxis("Vertical")) {
    // move if buttons are pressed
    var inputDir : float = Input.GetAxis("Vertical");
    var velocity : Vector2 = Vector2(inputDir * heading.x, inputDir * heading.y);
    rigidBody.velocity = Vector2.ClampMagnitude(velocity * speed, speed);

  } else {
    // Don't move when buttons are not pressed
    rigidBody.velocity = Vector2.zero;
  }

  cameraObj.transform.position.x = transform.position.x;
  cameraObj.transform.position.y = transform.position.y;

  if (Input.GetMouseButtonDown(0)) {
    player.FireWeapon();
  }

}
