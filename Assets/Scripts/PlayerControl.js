#pragma strict

public var speed : float = 3; // nopeus, voi muokata editorissa
public var hud : HUD;

private var rigidBody : Rigidbody2D; // rigidbody2d
private var player : Player;


function Start() {

  try {
    rigidBody = GetComponent(Rigidbody2D);
    player = GetComponent(Player);
    Instantiate(hud);
  } catch (err) {
    Debug.Log(err.ToString());
  }

}

function FixedUpdate() {

  try {

    var inputDir : float = Input.GetAxis('Vertical');
    var mousePos : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);

    var heading : Vector2 = (mousePos - transform.position).normalized;
    var velocity : Vector2 = Vector2(inputDir * heading.x, inputDir * heading.y);

    transform.up = heading;
    rigidBody.velocity = Vector2.ClampMagnitude(velocity * speed, speed);

    if (Input.GetMouseButtonDown(0)) {
      player.FireWeapon();
    }

  } catch (err) {

    Debug.Log("Error: " + err.ToString());

  }

}
