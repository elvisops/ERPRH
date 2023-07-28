import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.modules';
import { PublicComponent } from './public.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { BrowserModule } from '@angular/platform-browser';

// bootstrap
import { MaterialsModule } from './materials/materials.module';



@NgModule({
  declarations: [
    PublicComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    // BrowserModule,
    NgbModule,
    MaterialsModule
  ],
  exports:[

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicModule { }
