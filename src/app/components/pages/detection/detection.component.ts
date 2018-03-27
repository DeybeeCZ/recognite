import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Http, ResponseContentType } from '@angular/http';

@Component({
    selector: 'app-detection',
    templateUrl: './detection.component.html',
    styleUrls: ['./detection.component.styl']
})
export class DetectionComponent implements OnInit {

    videoObj={video: true};
    video_src:any;
    imageData: any;
    mensaje='hola';
    errBack=function(error){console.log("Ocurrió el siguiente error: " + error)};
    n = <any>navigator;

     constructor(private http: Http,private domSanitizer: DomSanitizer) {}
    //  constructor(private domSanitizer: DomSanitizer) {}
    // { "video": true }  // var errBack = function(error){};


    ngOnInit() {
        this.getPermitions();
    }

    getPermitions() {
        this.n.getMedia = ( this.n.getUserMedia || this.n.webkitGetUserMedia || this.n.mozGetUserMedia);
        // this.n.getMedia(this.videoObj,this.iniciarWebcam,this.errBack);
        this.n.mediaDevices.getUserMedia({video: true})
        .then((stream) => {
        this.video_src = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(stream));
        });
    }

    iniciarWebcam(stream){

    // console.log('esta es la url_actual',this);
    console.log('createObjectURL',window.URL.createObjectURL(stream));
    // console.log('localURL',localMediaStream);
    // video.src = window.URL.createObjectURL(stream);
    // this.srcVideo = 'miurl';//window.URL.createObjectURL(localMediaStream);
    //
    //     // var miCameraOnline    = getElementById('miCameraOnline'),
    //     //     video            = miCameraOnline.querySelectorAll('video'),
    //     //     canvas            = miCameraOnline.querySelectorAll('canvas');
    //
    //     // video.width = video.offsetWidth;
    //
    //     if(navigator.getUserMedia){                    // Standard
    //         this.srcVideo = stream;
    //         // video.play();
    //     }else if(navigator.webkitGetUserMedia){        // WebKit
    //         this.srcVideo = window.webkitURL.createObjectURL(stream);
    //         // video.play();
    //     }else if(navigator.mozGetUserMedia){        // Firefox
    //         this.srcVideo = window.URL.createObjectURL(stream);
    //         // video.play();
    //     }
    //
    //     // Click para hacer la foto
    //     // $('#webcam-popup .takephoto').click(function(){
    //     //     // Copiando la imagen a un canvas temporal
    //     //     var temp = document.createElement('canvas');
    //     //
    //     //     temp.width  = video.offsetWidth;
    //     //     temp.height = video.offsetHeight;
    //     //
    //     //     var tempcontext = temp.getContext("2d"),
    //     //         tempScale = (temp.height/temp.width);
    //     //
    //     //     temp.drawImage(
    //     //         video,
    //     //         0, 0,
    //     //
    //     //         video.offsetWidth, video.offsetHeight
    //     //     );
    //     //     // Redimensionar al tamaño de nuestro cavas
    //     //     canvas.style.height    = parseInt( canvas.offsetWidth * tempScale );
    //     //     canvas.width        = canvas.offsetWidth;
    //     //     canvas.height        = canvas.offsetHeight;
    //     //     var context        = canvas.getContext("2d"),
    //     //         scale        = canvas.width/temp.width;
    //     //     context.scale(scale, scale);
    //     //     context.drawImage(bigimage, 0, 0);
    //     // });
    }

    takePhoto(){
        console.log('tomar foto');
        // var img = new Image();
        // img.src = this.video_src;
        // img.onload = function () {
        //     var myImage = canvas.toDataURL("image/jpg");
        //     document.getElementById("dataurl").value = myImage;
        // }

        this.http.get(this.video_src, {
      responseType: ResponseContentType.Blob
    })
      .toPromise()
      .then((res: any) => {
        let blob = new Blob([res._body], {
          type: res.headers.get("Content-Type")
        });

        let urlCreator = window.URL;
        this.imageData = this.domSanitizer.bypassSecurityTrustUrl(
            urlCreator.createObjectURL(blob));
      });


        // this.urlImage=this.video_src;
        // // Copiando la imagen a un canvas temporal
        // var temp = document.createElement('canvas');
        //
        // temp.width  = video.offsetWidth;
        // temp.height = video.offsetHeight;
        //
        // var tempcontext = temp.getContext("2d"),
        //     tempScale = (temp.height/temp.width);
        //
        // temp.drawImage(
        //     video,
        //     0, 0,
        //
        //     video.offsetWidth, video.offsetHeight
        // );
        // // Redimensionar al tamaño de nuestro cavas
        // canvas.style.height    = parseInt( canvas.offsetWidth * tempScale );
        // canvas.width        = canvas.offsetWidth;
        // canvas.height        = canvas.offsetHeight;
        // var context        = canvas.getContext("2d"),
        //     scale        = canvas.width/temp.width;
        // context.scale(scale, scale);
        // context.drawImage(bigimage, 0, 0);
    }
}
