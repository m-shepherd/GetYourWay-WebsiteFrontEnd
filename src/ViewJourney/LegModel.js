export default class TodoModel {
    constructor({_id,transport,startLocation,startTime,endLocation,endTime,duration}) {
      this._id = _id;
      this.transport = transport;
      this.startLocation = startLocation;
      this.startTime = startTime;
      this.endLocation = endLocation;
      this.endTime = endTime;
      this.duration = duration;
    }
  }