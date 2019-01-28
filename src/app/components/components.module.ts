import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SetpageComponent } from "./setpage/setpage.component";
import { RuleComponent } from "./rule/rule.component";
import { EmailComponent } from "./email/email.component";
import { SigninComponent } from "./signin/signin.component";
import { RecordComponent } from "./record/record.component";
import { FeedbackComponent } from './feedback/feedback.component';
import { UsercentComponent } from './usercent/usercent.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    SetpageComponent,
    RuleComponent,
    EmailComponent,
    SigninComponent,
    RecordComponent,
    FeedbackComponent,
    UsercentComponent
  ],
  exports: [
    SetpageComponent,
    RuleComponent,
    EmailComponent,
    SigninComponent,
    RecordComponent,
    FeedbackComponent,
    UsercentComponent
  ]
})
export class ComponentsModule {}
