import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RecognitionService } from '../../../services/recognition.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.styl'],
    providers:[RecognitionService]
})
export class HomeComponent implements OnInit {

    // form: FormGroup;
    loading: boolean = false;
    labels:Array<any>;
    imageProperties;
    hints;
    imageData;
    color;

    constructor(public rService:RecognitionService,private sanitizer: DomSanitizer) { }

    ngOnInit() {
    }


    onFileChange(event) {
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            console.log('file',file);
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.imageData = reader.result.split(',')[1];
                this.rService.getLabels(reader.result.split(',')[1]).subscribe((result)=>{
                    // this.saveResults(reader.result.split(',')[1],result.json().responses);
                    console.log(result.json().responses);
                    this.labels=result.json().responses[0].labelAnnotations;
                    this.imageProperties=result.json().responses[0].imagePropertiesAnnotation;
                    this.hints = result.json().responses[0].cropHintsAnnotation;

                },
                err=>{
                    console.log('ocurrio un error',err);
                })
            };
        }
    }

    changeColor(r,g,b){
        this.color={red:r,green:g,blue:b,code:"#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)};
    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    getMyColor(r,g,b){
        return this.sanitizer.bypassSecurityTrustStyle("width:56%;height:100px;background-color:rgb("+r+","+g+","+b+")");
        // return this.sanitizer.bypassSecurityTrustStyle("width:56%;height:100px;background-color:rgb("+r+","+g+','+b+')');
    }

    // saveResults(imageData, results) {
    //     this.items.push({ imageData: imageData, results: results})
    //     .then(_ => {
    //     console.log('items',this.items) })
    //     .catch(err => { console.log('Error:',err) });
    // }


}
