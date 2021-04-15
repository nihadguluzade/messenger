export class Message {

  _id;

  destUID;

  srcUID;

  sentTime;

  read;

  constructor(destUID, srcUID) {
    this.destUID = destUID;
    this.srcUID = srcUID;
    this.sentTime = new Date().toLocaleString();
    this.read = false;
  }

}