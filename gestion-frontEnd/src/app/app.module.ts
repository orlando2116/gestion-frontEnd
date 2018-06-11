import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {  HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modules
import { ToastrModule } from 'ngx-toastr';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//routes
import { APP_ROUTING } from './app.routes';

//components
import { AppComponent } from './app.component';
import {HomeComponent,TabsComponent, LoginComponent,RegistroUsuarioComponent,
  HeaderComponent,FooterComponent,ActivarUsuarioComponent,
  MantenedorRestaurantComponent,AgregarRestaurantComponent,EditarRestaurantComponent,
  GestionRestaurantComponent,
  MantenedorTiposPlatoComponent,AgregarTipoPlatoComponent,EditarTipoPlatoComponent,
  MantenedorMesasComponent,AgregarMesaComponent,EditarMesaComponent,
  GestionPedidoComponent,ListarPlatosComponent,ListarPedidoComponent,EditarPedidoComponent,
  MantenedorPlatosComponent,AgregarPlatosComponent,EditarPlatosComponent,FinalizarPedidoComponent } from './components/index.components';

  /* compartidos */
import { OpcionesHttp } from './services/shared/opciones-http';

//services
import { LoginService } from './services/login.service';
import { UsuarioService } from './services/usuario.service';
import { RestaurantService } from './services/restaurant.service';
import { MesaService } from './services/mesa.service';
import { TipoPlatoService } from './services/tipo-plato.service';
import { PlatoService } from './services/plato.service';
import { PedidoService } from './services/pedido.service';

import { TokenService } from './services/token.service';
import { AutorizadorService } from './services/autorizador.service';

//dependencies
import { Autorizador } from './dependencies/autorizador';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabsComponent,
    LoginComponent,
    RegistroUsuarioComponent,   

    HeaderComponent,
    FooterComponent,        
    MantenedorRestaurantComponent, 
    AgregarRestaurantComponent, 
    EditarRestaurantComponent,
    GestionRestaurantComponent, 
    MantenedorTiposPlatoComponent,
    AgregarTipoPlatoComponent,
    EditarTipoPlatoComponent,
    MantenedorMesasComponent,
    AgregarMesaComponent,
    EditarMesaComponent,
    MantenedorPlatosComponent,
    AgregarPlatosComponent,
    EditarPlatosComponent,
    GestionPedidoComponent,
    GestionPedidoComponent,
    ListarPlatosComponent,
    ListarPedidoComponent,
    EditarPedidoComponent,
    FinalizarPedidoComponent,
    ActivarUsuarioComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center', timeOut: 3000, preventDuplicates: true }),
    Ng4LoadingSpinnerModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    APP_ROUTING,
    BrowserModule
  ],
  providers: [
    NgbModule,
    LoginService,
    UsuarioService,
    RestaurantService,
    MesaService,
    TipoPlatoService,
    PlatoService,
    PedidoService,
    TokenService,
    AutorizadorService,
    { provide: 'IAutorizador', useClass: Autorizador },
    { provide: 'IOpcionesHttp', useClass: OpcionesHttp }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
