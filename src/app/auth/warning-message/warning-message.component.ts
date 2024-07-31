import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-warning-message',
  standalone: true,
  imports: [],
  templateUrl: './warning-message.component.html',
  styleUrl: './warning-message.component.scss',
})
export class WarningMessageComponent {
  @Output() closeWarning: EventEmitter<boolean> = new EventEmitter<boolean>();
}
