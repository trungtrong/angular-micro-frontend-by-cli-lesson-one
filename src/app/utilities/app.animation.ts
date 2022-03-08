import {transition, trigger, query, group, style, animate} from '@angular/animations';

// Add to @Component meta-data
export const slideInAnimation = trigger('slideInAnimation', [
    // Transition between any two states (routes) with * <=> *
    transition('* <=> *', [
        // Events to apply
        // Defined style and animation function to apply
        // Config object with optional set to true to handle when element not yet added to the DOM
        query(':enter, :leave', style({
            position: 'fixed',
            width: '100%',
            zIndex: 2
        }), {
            optional: true
        }),
        group([
            query(':enter', [
                style({transform: 'translateX(100%)'}),
                animate(
                    '0.5s ease-out',
                    style({
                        transform: 'translateX(0%)'
                    })
                )
            ], {optional: true}),
            query(':leave', [
                style({transform: 'translateX(0%)'}),
                animate(
                    '0.5s ease-out',
                    style({
                        transform: 'translateX(-100%)'
                    })
                )
            ], {optional: true}),
        ])
    ])
]);

/**
 * @Component({
 *     animation: [slideInAnimation]
 * })
 *
 * In html
    <div class="container"
        [@slideInAnimation]="o.isActivated ? o.activateRoute : ''">
        <router-outlet #o="outlet"></router-outlet>
    </div>

 */
