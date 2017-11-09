    import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})
export class HeaderNavbarComponent implements OnInit {

  constructor() { }

    @Output() tabSelector = new EventEmitter<{id:Number,name:string,selected:boolean}>() 
    @Output() logoutEmmiter = new EventEmitter<{}>() 
    @Output() settingsEmmiter = new EventEmitter<{id:Number,name:string,selected:boolean}>() 
    @Output() hideProgressEmitter = new EventEmitter<{}>(); 
    @Output() showProgressEmitter = new EventEmitter<{}>();   

    @Output() tabsOptions = [{id:1,name:"Weeks",selected:false}]
    
    indexDefaultItem=  0;
    
    ngOnInit(){
        this.tabsOptions.forEach((item)=> {item.selected = false;});
        this.tabsOptions[this.indexDefaultItem].selected = true;
        this.tabSelector.emit(this.tabsOptions[this.indexDefaultItem]);
    }
    onSelectMenu(tab){
        this.tabsOptions.forEach((item)=> {item.selected = false;});
        tab.selected = true;
        this.tabSelector.emit(tab);
    }
    logout(){
        this.logoutEmmiter.emit();
    }
    showProgressIcon() {
         this.showProgressEmitter.emit();
    }
    hideProgressIcon() {
        this.hideProgressEmitter.emit();
    }
}
