import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SomethingIsBrokenComponent } from './components/something-is-broken/something-is-broken.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SomethingIsBrokenComponent],
  exports: [SomethingIsBrokenComponent],
})
export class FrontendToolsModule {}
