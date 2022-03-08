/* eslint-disable max-len */
/* 🤖 this file was generated by svg-to-ts*/
export const svgIconFacebook: {
    name: 'facebook';
    data: string;
} = {
    name: 'facebook',
    data: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 408.788 408.788"><path d="M353.701 0H55.087C24.665 0 .002 24.662.002 55.085v298.616c0 30.423 24.662 55.085 55.085 55.085h147.275l.251-146.078h-37.951a8.954 8.954 0 01-8.954-8.92l-.182-47.087a8.955 8.955 0 018.955-8.989h37.882v-45.498c0-52.8 32.247-81.55 79.348-81.55h38.65a8.955 8.955 0 018.955 8.955v39.704a8.955 8.955 0 01-8.95 8.955l-23.719.011c-25.615 0-30.575 12.172-30.575 30.035v39.389h56.285c5.363 0 9.524 4.683 8.892 10.009l-5.581 47.087a8.955 8.955 0 01-8.892 7.901h-50.453l-.251 146.078h87.631c30.422 0 55.084-24.662 55.084-55.084V55.085C408.786 24.662 384.124 0 353.701 0z" fill="#475993"/></svg>'
};
export const svgIconInstagram: {
    name: 'instagram';
    data: string;
} = {
    name: 'instagram',
    data: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 551.034 551.034"><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="275.517" y1="4.57" x2="275.517" y2="549.72" gradientTransform="matrix(1 0 0 -1 0 554)"><stop offset="0" stop-color="#e09b3d"/><stop offset=".3" stop-color="#c74c4d"/><stop offset=".6" stop-color="#c21975"/><stop offset="1" stop-color="#7024c4"/></linearGradient><path d="M386.878 0H164.156C73.64 0 0 73.64 0 164.156v222.722c0 90.516 73.64 164.156 164.156 164.156h222.722c90.516 0 164.156-73.64 164.156-164.156V164.156C551.033 73.64 477.393 0 386.878 0zM495.6 386.878c0 60.045-48.677 108.722-108.722 108.722H164.156c-60.045 0-108.722-48.677-108.722-108.722V164.156c0-60.046 48.677-108.722 108.722-108.722h222.722c60.045 0 108.722 48.676 108.722 108.722v222.722z" fill="url(#a)"/><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="275.517" y1="4.57" x2="275.517" y2="549.72" gradientTransform="matrix(1 0 0 -1 0 554)"><stop offset="0" stop-color="#e09b3d"/><stop offset=".3" stop-color="#c74c4d"/><stop offset=".6" stop-color="#c21975"/><stop offset="1" stop-color="#7024c4"/></linearGradient><path d="M275.517 133C196.933 133 133 196.933 133 275.516s63.933 142.517 142.517 142.517S418.034 354.1 418.034 275.516 354.101 133 275.517 133zm0 229.6c-48.095 0-87.083-38.988-87.083-87.083s38.989-87.083 87.083-87.083c48.095 0 87.083 38.988 87.083 87.083 0 48.094-38.989 87.083-87.083 87.083z" fill="url(#b)"/><linearGradient id="c" gradientUnits="userSpaceOnUse" x1="418.31" y1="4.57" x2="418.31" y2="549.72" gradientTransform="matrix(1 0 0 -1 0 554)"><stop offset="0" stop-color="#e09b3d"/><stop offset=".3" stop-color="#c74c4d"/><stop offset=".6" stop-color="#c21975"/><stop offset="1" stop-color="#7024c4"/></linearGradient><circle cx="418.31" cy="134.07" r="34.15" fill="url(#c)"/></svg>'
};
export const svgIconYoutube: {
    name: 'youtube';
    data: string;
} = {
    name: 'youtube',
    data: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 461.001 461.001"><path d="M365.257 67.393H95.744C42.866 67.393 0 110.259 0 163.137v134.728c0 52.878 42.866 95.744 95.744 95.744h269.513c52.878 0 95.744-42.866 95.744-95.744V163.137c0-52.878-42.866-95.744-95.744-95.744zm-64.751 169.663l-126.06 60.123c-3.359 1.602-7.239-.847-7.239-4.568V168.607c0-3.774 3.982-6.22 7.348-4.514l126.06 63.881c3.748 1.899 3.683 7.274-.109 9.082z" fill="#f61c0d"/></svg>'
};
export type svgIcon = 'facebook' | 'instagram' | 'youtube';
export interface SvgIcon {
    name: svgIcon;
    data: string;
}
export type IconNameSubset<T extends Readonly<SvgIcon[]>> = T[number]['name'];
