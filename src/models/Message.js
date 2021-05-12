export class Message {

  _id;

  destUID;

  srcUID;

  sentTime;

  read;

  content;

  constructor(destUID, srcUID, content) {
    this.destUID = destUID;
    this.srcUID = srcUID;
    this.content = content;
    this.sentTime = new Date().toLocaleString();
    this.read = false;
  }
}