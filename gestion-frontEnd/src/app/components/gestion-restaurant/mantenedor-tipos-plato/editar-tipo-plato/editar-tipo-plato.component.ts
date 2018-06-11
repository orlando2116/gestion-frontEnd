import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-tipo-plato',
  templateUrl: './editar-tipo-plato.component.html',
  styleUrls: ['./editar-tipo-plato.component.css']
})
export class EditarTipoPlatoComponent implements OnInit {

  constructor(private modalService: NgbModal,
              private _toastrService: ToastrService) { }

  ngOnInit() {
  }

  openVerticallyCentered(content) {
    const modalRef=this.modalService.open(content, { centered: true });

    modalRef.result.then((data) => {
    }, (reason) => {
    });
  }
}
