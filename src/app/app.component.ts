import { LogicalFileSystem } from '@angular/compiler-cli/src/ngtsc/file_system';
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
  @ViewChild('calc') calc!: ElementRef;
  title = 'calculadora-de-peso';
  selected = '';
  private touch = {
    type: '',
    touchtime: 0,
  };
  kg: any = undefined;

  constructor(private modal: NgbModal, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      var element = e.target as HTMLTextAreaElement;
      if (
        element.id !== 'calc' &&
        element.id !== 'puzzle' &&
        element.id !== 'tetris'
      ) {
        this.selected = '';
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.openModal(this.content, '');
  }

  onClickApp(content: any, type: string) {
    if (this.touch.touchtime == 0 && this.touch.type == type) {
      this.selected = type;
      this.touch.touchtime = new Date().getTime();
      this.touch.type = type;
    } else {
      if (
        new Date().getTime() - this.touch.touchtime < 800 &&
        this.touch.type == type
      ) {
        this.openModal(content, type);
        this.touch.touchtime = 0;
        this.touch.type = '';
      } else {
        this.touch.touchtime = new Date().getTime();
        this.touch.type = type;
        this.selected = type;
      }
    }
  }

  openModal(content: any, type: string) {
    if (type !== 'result') {
      this.kg = undefined;
    }
    this.selected = '';
    this.modal
      .open(content, {
        backdrop: 'static',
        animation: true,
        size: type == 'puzzle' || type == 'tetris' ? 'lg' : 'sm',
        centered: true,
        windowClass:
          type == 'result'
            ? 'result-modal'
            : type == 'puzzle' || type == 'tetris'
            ? 'puzzle-modal'
            : '',
      })
      .result.then((result) => {});
  }

  numericOnly(event: any): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }
}
