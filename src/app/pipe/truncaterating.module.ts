import { NgModule } from '@angular/core';
import { TruncateratingPipe } from './truncaterating.pipe';
import { AgeconvertPipe } from './ageconvert.pipe';

@NgModule({
declarations: [TruncateratingPipe, AgeconvertPipe],
imports: [],
exports: [TruncateratingPipe,AgeconvertPipe],
})

export class PipesModule {}