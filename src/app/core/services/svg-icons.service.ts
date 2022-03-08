import { Inject, Injectable } from '@angular/core';
import { SvgIcon } from '@app/shared/models';

@Injectable({
    providedIn: 'root'
})

export class SvgIconsRegistry {
    private registry = new Map<string, string>();

    public registerIcons(icons: SvgIcon[]): void {
        icons.forEach((icon: SvgIcon) => this.registry.set(icon.name, icon.data));
    }

    public getIcon(iconName: string): string | undefined {
        if (!this.registry.has(iconName)) {
            console.warn(`We could not find the dinosour Icon with the name ${iconName}, did you add
                it to the Icon registry?`);
        }
        return this.registry.get(iconName);
    }
}
