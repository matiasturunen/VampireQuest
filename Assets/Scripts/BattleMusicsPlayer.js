#pragma strict

public var battleStart: AudioClip;
public var battleLoop: AudioClip;
public var creepyStart: AudioClip;
public var creepyLoop: AudioClip;

private var audioSource: AudioSource;
private var nextToLoop: AudioClip;

function Start () {
  audioSource = GetComponent(AudioSource);
  nextToLoop = battleLoop;
  playClip(battleStart, false, 0.5);

}

function FixedUpdate() {
  GameOverCheck();
  LoopNext();
}

private function LoopNext() {
  if (!audioSource.isPlaying) {
    Debug.Log('LoopNext');
    playClip(nextToLoop, true, 0.5);
  }
}

private function GameOverCheck() {
  // check if player has been removed (died)
  if (!GameObject.FindWithTag('Player')) {
    if ((audioSource.clip != creepyStart) && (audioSource.clip != creepyLoop)) {
      Debug.Log('creepyStart');
      playClip(creepyStart, false, 1.0);
      nextToLoop = creepyLoop;
    }
  }
  
}

private function playClip(clip: AudioClip, loop: boolean, volume: float) {
  audioSource.clip = clip;
  audioSource.loop = loop;
  audioSource.volume = volume;
  audioSource.Play();
}
