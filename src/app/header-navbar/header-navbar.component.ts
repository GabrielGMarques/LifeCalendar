import { Component, EventEmitter, OnInit, Output, ElementRef } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-header-navbar',
    templateUrl: './header-navbar.component.html',
    styleUrls: ["./header-navbar.component.css"],

})
export class HeaderNavbarComponent implements OnInit {

    constructor(private periodsFilter: ElementRef) { }

    @Output() tabSelector = new EventEmitter<{ id: Number, name: string, selected: boolean }>()
    @Output() logoutEmmiter = new EventEmitter<{}>()
    @Output() settingsEmmiter = new EventEmitter<{ id: Number, name: string, selected: boolean }>()
    @Output() hideProgressEmitter = new EventEmitter<{}>();
    @Output() showProgressEmitter = new EventEmitter<{}>();
    @Output() updatePeriodFilterEmitter = new EventEmitter<{}>();

    @Output() tabsOptions = [{ id: 1, name: "Weeks", selected: false }]

    indexDefaultItem = 0;

    ngOnInit() {
        this.tabsOptions.forEach((item) => { item.selected = false; });
        this.tabsOptions[this.indexDefaultItem].selected = true;
        this.tabSelector.emit(this.tabsOptions[this.indexDefaultItem]);

    }


    onSelectMenu(tab) {
        this.tabsOptions.forEach((item) => { item.selected = false; });
        tab.selected = true;
        this.tabSelector.emit(tab);
    }
    logout() {
        this.logoutEmmiter.emit();
    }
    updatePeriodFilter(level: number) {
        this.updatePeriodFilterEmitter.emit(level);
    }
    showProgressIcon() {
        this.showProgressEmitter.emit();
    }
    hideProgressIcon() {
        this.hideProgressEmitter.emit();
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
        $('#periodsFilter').css('width', '340px');
        $('.slider-tick-label').css('width', '113.333px');
        $('.slider-tick-label-container').css('marginLeft', '-56.6667px');
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
