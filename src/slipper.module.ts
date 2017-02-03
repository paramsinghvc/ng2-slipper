import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlipperDirective } from './slipper.directive';

@NgModule({
	imports: [CommonModule],
	declarations: [SlipperDirective],
	exports: [SlipperDirective]
})
export class SlipperModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SlipperModule,
			providers: []
		}
	}
}