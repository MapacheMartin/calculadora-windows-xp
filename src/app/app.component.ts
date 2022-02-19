import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('contentCalculator') content!: ElementRef;
  @ViewChild('app') app!: ElementRef;
  title = 'calculadora-de-peso';
  selected = false;
  private touchtime: any = 0;
  kg: any = undefined;

  constructor(private modal: NgbModal, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      var element = e.target as HTMLTextAreaElement;

      if (element.id !== 'app') {
        this.selected = false;
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.openCalculadora(this.content, '');
  }

  onClickApp(content: any) {
    if (this.touchtime == 0) {
      this.selected = true;

      this.touchtime = new Date().getTime();
    } else {
      if (new Date().getTime() - this.touchtime < 800) {
        this.openCalculadora(content, '');
        this.touchtime = 0;
      } else {
        this.touchtime = new Date().getTime();
        this.selected = true;
      }
    }
  }

  openCalculadora(content: any, type: string) {
    this.kg = undefined;
    this.selected = false;
    this.modal
      .open(content, {
        backdrop: 'static',
        animation: false,
        size: 'sm',
        centered: true,
        windowClass: type == 'result' ? 'result-modal' : '',
      })
      .result.then((result) => {});
  }

  numericOnly(event: any): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
}
