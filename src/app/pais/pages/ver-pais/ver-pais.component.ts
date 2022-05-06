import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from "rxjs/operators";
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(private activatedRoute: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {

    // Ambas funciones son lo mismo

      this.activatedRoute.params
          .pipe(
              switchMap( ({ id }) => this.paisService.getPaisPorAlpha(id) ),
              tap(console.log) // Imprime por consola lo del switchMap
          )
          .subscribe( pais => this.pais = pais[0]); // Se pone [0] porque siempre devuelve un solo elemento por lo que está en la posición 0

      /*this.activatedRoute.params
          .subscribe( ({ id }) => { // Desestruturación
              console.log(id);
              this.paisService.getPaisPorAlpha(id)
                  .subscribe( pais => {
                      console.log(pais);
                  });
          })*/
  }

}
