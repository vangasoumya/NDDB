
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeHtml} from '@angular/platform-browser';
import { ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Pipe({name: 'safeHtml'})
export class Safe {
    public outputdiseasealias;
  constructor(private _sanitizer:DomSanitizer, private elRef:ElementRef, private cdRef:ChangeDetectorRef){}

  navigate(){
 
    $('ul.tabs').tabs('select_tab', 'test-swipe-6');
 
}
  transform(value:string):SafeHtml {
      console.log(value)
     this.outputdiseasealias  = value;
      this.cdRef.detectChanges();
      this.elRef.nativeElement.querySelector('a').addEventListener('click', this.navigate.bind(this))
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }
}