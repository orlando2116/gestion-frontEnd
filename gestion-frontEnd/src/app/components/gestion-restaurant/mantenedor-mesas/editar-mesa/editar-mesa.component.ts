import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-mesa',
  templateUrl: './editar-mesa.component.html',
  styleUrls: ['./editar-mesa.component.css']
})
export class EditarMesaComponent implements OnInit {

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
