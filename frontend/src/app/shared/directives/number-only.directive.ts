
import { HostListener } from '@angular/core';
import { Directive, ElementRef} from '@angular/core';

@Directive({
  selector: 'input[numberOnly]'
})
export class NumberOnlyDirective {

  constructor(private readonly elRef:ElementRef) { }
  @HostListener('input',['$event'])
  onChangeInput(event:Event):void{
    console.log(this.elRef.nativeElement.value);
  }
}
