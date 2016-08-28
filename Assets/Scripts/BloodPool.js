#pragma strict

var images: Sprite[];
var lifeTime: float = 10;

private var bloodTotal: float = 10;
private var bloodLeft: float = 10;

function Update() {
  UpdateImage();
}

function FixedUpdate() {
  lifeTime -= Time.deltaTime;

  if (lifeTime < 0 ) {
    Destroy(gameObject);
  }
}

function setProperties(amount: float) {
  bloodTotal = amount;
  bloodLeft = amount;
}

function DrainPool(amount: float) {
  bloodLeft -= amount;
  if (bloodLeft < 0) {
    // can't drink more than pool has in it
    amount = bloodLeft;

    // pool is empty.
    Destroy(gameObject);
  }

  // return amount that was drinked
  return amount;
}

private function UpdateImage() {
  var imagesCount = images.length;
  var imageToRender = Mathf.Ceil((bloodLeft / bloodTotal) * imagesCount) - 1;
  //Debug.Log('render image ' + imageToRender + ' blood ' + bloodLeft + ' / ' + bloodTotal);

  try {
    gameObject.GetComponent(SpriteRenderer).sprite = images[imageToRender];
  } catch (err) {
    // Invalid image
    // destroy object to prevent accidents
    Destroy(gameObject);
  }
}
