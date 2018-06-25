import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

const Peer = require('peerjs');

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: [ './video-chat.component.scss' ]
})
export class VideoChatComponent implements OnInit, OnDestroy
{
  @ViewChild('videochat') videoPlayer: any;
  private _subscription: Subscription;
  private _objectUrls: string[] = [];
  peer;
  recieverId: any;
  clientId: any;
  allowAudio = false;
  allowVideo = true;


  constructor(private userService: UserService) {

  }

  ngOnInit() {
    let video = this.videoPlayer.nativeElement;
    this.peer = new Peer({ host: 'localhost', port: 23400, debug: true });
    //this.peer.id = this.userService.getUser().id;

    this.peer.on('open', (id) => {
      this.setClientId(id);
      console.log('Peer Client ID: ', this.clientId);
    });

    this.peer.on('call', function (call) {

      const n = <any>navigator;
      n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );

      n.getUserMedia({ video: true, audio: true }, (stream: MediaStream) => {
        call.answer(stream);
        call.on('stream', (remoteStream: MediaStream) => {
          video.src = URL.createObjectURL(remoteStream);
          video.play();
        });
      }, function (err) {
        console.log('Failed to get stream', err);
      });
    });

    console.log(this.peer);
  }

  setClientId(id) {
    this.clientId = id;
  }

  toggleAllowAudio() {
    this.allowAudio = !this.allowAudio;
  }

  toggleAllowVideo() {
    this.allowVideo = !this.allowVideo;
  }

  connect() {
    const conn = this.peer.connect(this.recieverId);
    conn.on('open', () => {
      conn.send('Message from that id');
    });
  }

  videoConnect() {
    let video = this.videoPlayer.nativeElement;

    const n = <any>navigator;
    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );

    navigator.getUserMedia({ video: this.allowVideo, audio: this.allowAudio }, (stream) => {

      const call = this.peer.call(this.recieverId, stream);
      call.on('stream', (remoteStream: MediaStream) => {
        const objectUrl = URL.createObjectURL(remoteStream);
        this._objectUrls.push(objectUrl);

        video.src = objectUrl;
        video.play();
      });
    }, function (err) {
      console.log('Failed to get stream', err);
    });

  }

  ngOnDestroy() {
    //URL.revokeObjectURL(this._remoteStream);

    this._objectUrls.forEach(url => {
      URL.revokeObjectURL(url);
    });
    this.peer.destroy();
  }

}
