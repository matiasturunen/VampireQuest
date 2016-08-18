#pragma strict

public var speed : float = 3; // nopeus, voi muokata editorissa
public var cameraPrefab : Camera; // kamera - prefab

private var rigidBody : Rigidbody2D; // rigidbody2d
private var cameraObj : Camera;


function Start() : void {

  rigidBody = GetComponent(Rigidbody2D);
  cameraObj = Instantiate(cameraPrefab);

}

function FixedUpdate() : void {

  var inputDir : float = Input.GetAxis("Vertical");
  var mousePos : Vector2 = cameraObj.ScreenToWorldPoint(Input.mousePosition);

  var heading : Vector2 = (mousePos - transform.position).normalized;
  var velocity : Vector2 = Vector2(inputDir * heading.x, inputDir * heading.y);

  transform.up = heading;
  rigidBody.velocity = Vector2.ClampMagnitude(velocity * speed, speed);

  cameraObj.transform.position.x = transform.position.x;
  cameraObj.transform.position.y = transform.position.y;

  if (Input.GetMouseButtonDown(0)) {
    GetComponent(ActorScript).FireWeapon();
  }

}
