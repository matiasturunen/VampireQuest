#pragma strict

function Update () {
  if (Input.GetKey("escape")) {
    Application.LoadLevel(0);
  }
}
