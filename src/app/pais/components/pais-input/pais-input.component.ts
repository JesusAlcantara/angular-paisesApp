import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [
  ]
})
export class PaisInputComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = '';

  debouncer: Subject<string> = new Subject();

  termino: string = '';

  constructor() { }

  ngOnInit() {
      this.debouncer
          .pipe(
              debounceTime(300) // Milésimas de segundos antes de emitir el subscribe
          )
          .subscribe(valor => {
              this.onDebounce.emit( valor );
      })
  }

  buscar() {
      this.onEnter.emit(this.termino); // Emite el termino al dar Enter
  }

  teclaPresionada( event: any ) {
      this.debouncer.next( this.termino ); // El next hace que se lance el OnInit de nuevo
  }

}
