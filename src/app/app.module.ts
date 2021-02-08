import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule, TooltipOptions } from 'ng2-tooltip-directive';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivateRoomsLayoutComponent } from './components/private-rooms-layout/private-rooms-layout.component';
import { SettingsOverlayComponent } from './components/settings-overlay/settings-overlay.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SideMenuComponent,
    PrivateRoomsLayoutComponent,
    HomeComponent,
    SettingsOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    TooltipModule.forRoot({ "hide-delay": 0 } as TooltipOptions),
    NgScrollbarModule.withConfig({ appearance: 'compact' }),
    ClipboardModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [SideMenuComponent]
})
export class AppModule { }
