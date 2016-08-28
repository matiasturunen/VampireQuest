#pragma strict

public var speed : float = 3; // nopeus, voi muokata editorissa

private var rigidBody : Rigidbody2D; // rigidbody2d
private var player : Player;


function Start() {

  rigidBody = GetComponent(Rigidbody2D);
  player = GetComponent(Player);

}

function FixedUpdate() {

  try {

    // look towards mouse pointer
    var mousePos : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    var heading : Vector2 = (mousePos - transform.position).normalized;
    transform.up = heading;

  } catch (err) {
    Debug.Log(err.ToString());
  }

  if (Input.GetAxis("Vertical")) {
    // move if buttons are pressed
    var inputDir : float = Input.GetAxis("Vertical");
    var velocity : Vector2 = Vector2(inputDir * heading.x, inputDir * heading.y);
    rigidBody.velocity = Vector2.ClampMagnitude(velocity * speed, speed);

  } else {
    // Don't move when buttons are not pressed
    rigidBody.velocity = Vector2.zero;
  }

  if (Input.GetMouseButtonDown(0)) {
    player.FireWeapon();
  }

}
