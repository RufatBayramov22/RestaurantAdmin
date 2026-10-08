declare module 'react-native-sound-player' {
  const SoundPlayer: {
    playUrl: (url: string) => void;
    pause: () => void;
    stop: () => void;
    addEventListener: (
      eventName: 'FinishedPlaying' | string,
      callback: (...args: any[]) => void,
    ) => { remove: () => void };
  };

  export default SoundPlayer;
}
