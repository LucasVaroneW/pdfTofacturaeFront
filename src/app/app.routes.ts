import { Routes } from '@angular/router';
import { ConverterComponent } from './infrastructure/ui/components/converter/converter.component';

export const routes: Routes = [
    {
        path: '',
        component: ConverterComponent
    },
    { path: '**', redirectTo: '' }
];
