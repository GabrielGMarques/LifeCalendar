import { PeriodFilterService } from '../services/period-filter.service';
import { Component, EventEmitter, OnInit, Output, ElementRef } from '@angular/core';
import { ProgressService } from '../services/progress.service'
import { AngularFireAuth } from 'angularfire2/auth';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
    selector: 'app-header-navbar',
    templateUrl: './header-navbar.component.html',
    styleUrls: ["./header-navbar.component.css"],

})
export class HeaderNavbarComponent implements OnInit {

    constructor(private afAuth: AngularFireAuth,
        private periodsFilter: ElementRef,
        private progressService: ProgressService,
        private periodFilterService: PeriodFilterService,
        private modalService: NgbModal) { }

    @Output() settingsEmmiter = new EventEmitter<{ id: Number, name: string, selected: boolean }>();


    @Output() tabsOptions = [{ id: 1, name: "Weeks", selected: false }]

    private modalRef: NgbModalRef;

    indexDefaultItem = 0;

    ngOnInit() {
        this.tabsOptions.forEach((item) => { item.selected = false; });
        this.tabsOptions[this.indexDefaultItem].selected = true;
    }

    openModal(content) {
        this.modalRef = this.modalService.open(content);
    }

    closeModal() {
        this.modalRef.close();
    }

    onSelectMenu(tab) {
        this.tabsOptions.forEach((item) => { item.selected = false; });
        tab.selected = true;
    }

    logout() {
        this.afAuth.auth.signOut();
        location.reload();
    }

    updatePeriodFilter(level: number) {
        this.periodFilterService.updateLevel(level);
    }

    showProgressIcon() {
        this.progressService.showProgress();
    }

    hideProgressIcon() {
        this.progressService.hideProgress();
    }

    ngAfterViewInit() {

        //slider configuration
        $('#periodsFilter').css('width', '340px');

        var mySlider = $("input.slider").bootstrapSlider();

        this.updateSlideBarColors();


        $('#periodsFilter').on('change', (component) => {
            this.updatePeriodFilter(component.value.newValue);
            this.updateSlideBarColors();
        });

    }

    updateSlideBarColors() {
        $('#periodsFilter').css('width', '400px');
        $('.slider-tick-label').css('width', '100px');
        $('.slider-tick-label-container').css('marginLeft', '-50px');
        $('.slider-handle').css('backgroundImage', 'none');
        $('.slider-handle').css('backgroundColor', '#ff6d00');

        $('.slider-tick.round').css('backgroundImage', 'none');
        $('.slider-tick.round').css('backgroundColor', '#DDDDDD');
        $('.slider-track-high').css('backgroundColor', '#DDDDDD');

        $('.in-selection').css('backgroundImage', 'none');

        $('.in-selection').css('backgroundColor', '#ff6d00');

        $('#periodsFilter .slider-selection').css('backgroundImage', 'none');
        $('#periodsFilter .slider-selection').css('backgroundColor', '#ff6d00');
    }
}
