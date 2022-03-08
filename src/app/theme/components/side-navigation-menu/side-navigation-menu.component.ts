import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-side-navigation-menu',
    templateUrl: './side-navigation-menu.component.html',
    styleUrls: ['./side-navigation-menu.component.scss']
})
export class SideNavigationMenuComponent implements OnInit {
    pages = [
        {
            id: '1_0',
            routerLink: '/main',
            text: 'Main Module',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_1',
            routerLink: '/basic/change-detector',
            text: 'Change Detection',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_2',
            routerLink: '/basic/svg-icon-library',
            text: 'SVG Icon Library',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_3',
            routerLink: '/basic/routing',
            text: 'Routing',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_4',
            routerLink: '/basic/pipes',
            text: 'Pipes',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_5',
            routerLink: '/basic/observables',
            text: 'Observables',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_6',
            routerLink: '/basic/ngRx-demo-one',
            text: 'NgRx Demo One',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_8',
            routerLink: '/basic/ngRx-demo-two',
            text: 'NgRx Demo Two',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_9',
            routerLink: '/basic/ngrx-nest-js-demo-three',
            text: 'NgRx NestJS Demo Three',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_10',
            routerLink: '/basic/ngxs-salad-example-one',
            text: 'NgXS Salad Example One',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_11',
            routerLink: '/basic/ngxs-authentication',
            text: 'NgXS Authentication',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_12',
            routerLink: '/basic/dependency-injection',
            text: 'Dependency Injection',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_13',
            routerLink: '/basic/interceptors',
            text: 'Interceptors',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_14',
            routerLink: '',
            text: 'Error Handler',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_15',
            routerLink: '/basic/sass',
            text: 'SASS',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_16',
            routerLink: '/basic/angular-material',
            text: 'Angular Material',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_17',
            routerLink: '/basic/view-child-concepts',
            text: 'View Child Concepts',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_18',
            routerLink: '/basic/directive',
            text: 'Directive',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
        {
            id: '1_18',
            routerLink: '/basic/tailwind',
            text: 'tailwind',
            icon: ' <i class="fas fa-user-friends"></i>',
        },
    ];

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    goToPage(e: any) {
        this.router.navigate([`${e.itemData.routerLink}`]).then();
    }
}
