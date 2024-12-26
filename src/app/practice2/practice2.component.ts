import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-practice2',
  templateUrl: './practice2.component.html',
  styleUrl: './practice2.component.css'
})
export class Practice2Component implements OnChanges {
  @Input() data: string = 'current value';

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges triggered:', changes);
    if (changes['data']) {
      console.log('Previous Value:', changes['data'].previousValue);
      console.log('Current Value:', changes['data'].currentValue);
    }
  }

}
