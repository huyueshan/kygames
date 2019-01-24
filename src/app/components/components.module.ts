import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SetpageComponent } from "./setpage/setpage.component";
import { RuleComponent } from './rule/rule.component';
import { EmailComponent } from './email/email.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SetpageComponent, RuleComponent, EmailComponent],
  exports: [SetpageComponent, RuleComponent, EmailComponent]
})
export class ComponentsModule {}
